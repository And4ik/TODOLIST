import { beforeEach, expect, test } from "vitest"

import { nanoid } from "@reduxjs/toolkit"
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  createTodolistAC,
  deleteTodolistAC,
  DomainTodolist,
  todolistsReducer,
} from "@/features/todolists/model/todolists-slice.ts"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "All", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", filter: "All", addedDate: "", order: 0 },
  ]
})

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(startState, deleteTodolistAC({ id: todolistId1 }))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be created", () => {
  const title = "New todolist"
  const endState = todolistsReducer(startState, createTodolistAC(title))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(title)
})

test("change todolist title", () => {
  const title = "New title"
  // const endState = todolistsReducer(startState, changeTodolistTitleTC.fulfilled({ id: todolistId2, title }))
  const endState = todolistsReducer(
    startState,
    changeTodolistTitleTC.fulfilled({ id: todolistId2, title }, "", { id: todolistId2, title }),
  )
  expect(endState.length).toBe(2)
  expect(endState[1].title).toBe("New title")
})

test("correct todolist should change its filter", () => {
  const filter = "Completed"
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }))

  expect(endState[0].filter).toBe("All")
  expect(endState[1].filter).toBe(filter)
})
