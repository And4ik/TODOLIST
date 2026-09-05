import { createTodolistTC, deleteTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { changeStatusAC } from "@/app/app-slice.ts"

export type TasksState = Record<string, DomainTask[]>

export const tasksSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksState,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => ({
    //   TC
    fetchTasksTC: create.asyncThunk(
      async (todolistId: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await tasksApi.getTasks(todolistId)
          dispatch(changeStatusAC({ status: "succeeded" }))
          const tasks = res.data.items
          return { tasks, todolistId }
        } catch (error) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          state[action.payload.todolistId] = action.payload.tasks
        },
      },
    ),
    createTaskTC: create.asyncThunk(
      async (payload: { todolistId: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await tasksApi.createTask(payload)
          dispatch(changeStatusAC({ status: "succeeded" }))
          return { task: res.data.data.item }
        } catch (e) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const newTask = action.payload.task
          state[newTask.todoListId].unshift(newTask)
        },
      },
    ),
    deleteTaskTC: create.asyncThunk(
      async (args: { todolistId: string; taskId: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          await tasksApi.deleteTask(args)
          dispatch(changeStatusAC({ status: "succeeded" }))
          return { todolistId: args.todolistId, taskId: args.taskId }
        } catch (error) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const tasks = state[action.payload.todolistId]
          const index = tasks.findIndex((t) => t.id === action.payload.taskId)
          if (index !== -1) {
            tasks.splice(index, 1)
          }
        },
      },
    ),
    changeTaskStatusTC: create.asyncThunk(
      async (task: DomainTask, { dispatch, rejectWithValue }) => {
        try {
          const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
          }
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model })
          dispatch(changeStatusAC({ status: "succeeded" }))
          return { task: res.data.data.item }
        } catch (error) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const newTask = action.payload.task
          const task = state[newTask.todoListId].find((t) => t.id === newTask.id)
          if (task) {
            task.status = newTask.status
          }
        },
      },
    ),
    changeTaskTitleTC: create.asyncThunk(
      async (task: DomainTask, { dispatch, rejectWithValue }) => {
        try {
          const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
          }
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model })
          dispatch(changeStatusAC({ status: "succeeded" }))
          return { task: res.data.data.item }
        } catch (error) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(null)
        }
      },
      {
        fulfilled: (state, action) => {
          const newTask = action.payload.task
          const task = state[newTask.todoListId].find((t) => t.id === newTask.id)
          if (task) {
            task.title = newTask.title
          }
        },
      },
    ),
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

export const { deleteTaskTC, createTaskTC, changeTaskTitleTC, fetchTasksTC, changeTaskStatusTC } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors
export const tasksReducer = tasksSlice.reducer
