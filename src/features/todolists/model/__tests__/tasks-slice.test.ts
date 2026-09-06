import { beforeEach, expect, test } from "vitest"

import {
  changeTaskStatusTC,
  createTaskTC,
  deleteTaskTC,
  changeTaskTitleTC,
  tasksReducer,
  TasksState,
} from "@/features/todolists/model/tasks-slice.ts"

import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"
import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"

let startState: TasksState = {}

const taskDefaultValues = {
  description: "",
  deadline: "",
  addedDate: "",
  startDate: "",
  priority: TaskPriority.Low,
  order: 0,
}

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatus.Completed,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  }
})

test("array should be created for new todolist", () => {
  const endState = tasksReducer(
    startState,
    createTodolistTC.fulfilled({ id: "4", title: "New todolist", addedDate: "32", order: 1 }, "", "New todolist"),
  )

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2")
  if (!newKey) {
    throw Error("New key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todolistId should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTodolistTC.fulfilled({ id: "todolistId2" }, "", { id: "todolistId2" }),
  )

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
  // or
  expect(endState["todolistId2"]).toBeUndefined()
})

test("correct task should be deleted", () => {
  const endState = tasksReducer(
    startState,
    deleteTaskTC.fulfilled({ todolistId: "todolistId2", taskId: "2" }, "", { todolistId: "todolistId2", taskId: "2" }),
  )

  expect(endState.todolistId2.length).toBe(2)
  expect(endState.todolistId2.find((t) => t.id === "2")).toBeUndefined()
  expect(endState.todolistId1.length).toBe(3)
  expect(endState).toEqual({
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatus.Completed,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "React",
        status: TaskStatus.New,
        todoListId: "todolistId1",
        ...taskDefaultValues,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatus.New,
        todoListId: "todolistId2",
        ...taskDefaultValues,
      },
    ],
  })
})

test("correct task should be created at correct array", () => {
  const endState = tasksReducer(
    startState,
    createTaskTC.fulfilled(
      {
        task: {
          id: "4",
          title: "juice",
          status: TaskStatus.New,
          todoListId: "todolistId2",
          ...taskDefaultValues,
        },
      },
      "",
      { todolistId: "todolistId2", title: "juice" },
    ),
  )

  expect(endState.todolistId1.length).toBe(3)
  expect(endState.todolistId2.length).toBe(4)
  expect(endState.todolistId2[0].id).toBe("4")
  expect(endState.todolistId2[0].title).toBe("juice")
  expect(endState.todolistId2[0].status).toBe(TaskStatus.New)
})

test("correct task should change its status", () => {
  const updatedTask = {
    id: "3",
    title: "tea",
    status: TaskStatus.Completed,
    todoListId: "todolistId2",
    ...taskDefaultValues,
  }
  const endState = tasksReducer(startState, changeTaskStatusTC.fulfilled({ task: updatedTask }, "", updatedTask))

  expect(endState.todolistId2[2].status).toBe(TaskStatus.Completed)
  expect(endState.todolistId2.length).toBe(3)
})

test("correct task should change its title", () => {
  const updatedTask = {
    id: "2",
    title: "New title",
    status: TaskStatus.Completed,
    todoListId: "todolistId2",
    ...taskDefaultValues,
  }
  const endState = tasksReducer(startState, changeTaskTitleTC.fulfilled({ task: updatedTask }, "", updatedTask))

  expect(endState.todolistId2[1].title).toBe("New title")
  expect(endState.todolistId2.length).toBe(3)
})
