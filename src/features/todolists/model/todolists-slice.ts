import { FilterValues } from "@/app/App.tsx"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/common/utils"
import { changeStatusAC } from "@/app/app-slice.ts"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    //   AC
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const { id, filter } = action.payload
      const todolist = state.find((tl) => tl.id === id)
      if (todolist) {
        todolist.filter = filter
      }
    }),
    //   TC
    fetchTodolistsTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await todolistsApi.getTodolists()
          dispatch(changeStatusAC({ status: "succeeded" }))
          return res.data
        } catch (error) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (_, action) => {
          return action.payload.map((tl) => ({ ...tl, filter: "All" }))
        },
      },
    ),
    createTodolistTC: create.asyncThunk(
      async (title: string, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          const res = await todolistsApi.createTodolist(title)
          dispatch(changeStatusAC({ status: "succeeded" }))
          return res.data.data.item
        } catch (error) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          state.push({
            ...action.payload,
            filter: "All",
          })
        },
      },
    ),
    deleteTodolistTC: create.asyncThunk(
      async (args: { id: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          await todolistsApi.deleteTodolist(args.id)
          dispatch(changeStatusAC({ status: "succeeded" }))
          return args
        } catch (error) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const index = state.findIndex((tl) => tl.id === action.payload.id)
          if (index !== -1) {
            state.splice(index, 1)
          }
        },
      },
    ),
    changeTodolistTitleTC: create.asyncThunk(
      async (args: { id: string; title: string }, { dispatch, rejectWithValue }) => {
        try {
          dispatch(changeStatusAC({ status: "loading" }))
          await todolistsApi.changeTodolistTitle(args)
          dispatch(changeStatusAC({ status: "succeeded" }))
          return args
        } catch (error) {
          dispatch(changeStatusAC({ status: "failed" }))
          return rejectWithValue(error)
        }
      },
      {
        fulfilled: (state, action) => {
          const { id, title } = action.payload
          const index = state.findIndex((tl) => tl.id === id)
          if (index !== -1) {
            state[index].title = title
          }
        },
      },
    ),
  }),
})

export const { changeTodolistFilterAC, fetchTodolistsTC, createTodolistTC, deleteTodolistTC, changeTodolistTitleTC } =
  todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer
