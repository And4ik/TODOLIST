import { createAction, createReducer, nanoid } from "@reduxjs/toolkit"
import { createTodolistAC, deleteTodolistAC } from "@/features/todolists/model/todolists-reducer.ts"
import { TasksState } from "@/app/App.tsx"

const initialState: TasksState = {}

export const deleteTaskAC = createAction<{ todolistId: string; taskId: string }>("tasks/deleteTask")
export const createTaskAC = createAction("tasks/createTask", (payload: { todolistId: string; title: string }) => {
  return { payload: { ...payload, taskId: nanoid() } }
})
export const changeTaskStatusAC = createAction<{ todolistId: string; taskId: string; isDone: boolean }>(
  "tasks/changeTaskStatus",
)
export const changeTaskTitleAC = createAction<{ todolistId: string; taskId: string; title: string }>(
  "tasks/changeTaskTitle",
)

export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(createTodolistAC, (state, action) => {
      state[action.payload.todolistId] = []
    })
    .addCase(deleteTodolistAC, (state, action) => {
      delete state[action.payload.todolistId]
    })
    .addCase(deleteTaskAC, (state, action) => {
      const { todolistId, taskId } = action.payload
      const index = state[todolistId].findIndex((t) => t.id === taskId)
      if (index !== -1) {
        state[todolistId].splice(index, 1)
      }
    })
    .addCase(createTaskAC, (state, action) => {
      const { todolistId, taskId, title } = action.payload
      state[todolistId].unshift({ id: taskId, title, isDone: false })
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const { todolistId, taskId, isDone } = action.payload
      const task = state[todolistId].find((t) => t.id === taskId)
      if (task) {
        task.isDone = isDone
      }
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const { todolistId, taskId, title } = action.payload
      const task = state[todolistId].find((t) => t.id === taskId)
      if (task) {
        task.title = title
      }
    })
})
