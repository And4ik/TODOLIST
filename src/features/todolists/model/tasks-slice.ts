import { createSlice, nanoid } from "@reduxjs/toolkit"
import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { TasksState } from "@/app/App.tsx"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    deleteTaskAC: create.reducer<{ todolistId: string; taskId: string }>((state, action) => {
      const { todolistId, taskId } = action.payload
      const index = state[todolistId].findIndex((t) => t.id === taskId)
      if (index !== -1) {
        state[todolistId].splice(index, 1)
      }
    }),
    createTaskAC: create.preparedReducer(
      (payload: { id: string; title: string }) => ({ payload: { ...payload, taskId: nanoid() } }),
      (state, action) => {
        const { id, taskId, title } = action.payload
        state[id].unshift({ id: taskId, title, isDone: false })
      },
    ),
    changeTaskStatusAC: create.reducer<{ todolistId: string; taskId: string; isDone: boolean }>((state, action) => {
      const { todolistId, taskId, isDone } = action.payload
      const task = state[todolistId].find((t) => t.id === taskId)
      if (task) {
        task.isDone = isDone
      }
    }),
    changeTaskTitleAC: create.reducer<{ todolistId: string; taskId: string; title: string }>((state, action) => {
      const { todolistId, taskId, title } = action.payload
      const task = state[todolistId].find((t) => t.id === taskId)
      if (task) {
        task.title = title
      }
    }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state[action.payload.id] = []
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const { deleteTaskAC, createTaskAC, changeTaskStatusAC, changeTaskTitleAC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer
