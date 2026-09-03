import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FilterValues } from "@/app/App.tsx"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

export type DomainTodolist = Todolist & {
  filter: FilterValues
}

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => ({
    // createTodolistAC: create.preparedReducer(
    //   (title: string) => ({ payload: { id: nanoid(), title } }),
    //   (state, action) => {
    //     state.push({ ...action.payload, filter: "All", addedDate: "", order: 0 })
    //   },
    // ),
    // deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
    //   const index = state.findIndex((tl) => tl.id === action.payload.id)
    //   if (index !== -1) {
    //     state.splice(index, 1)
    //   }
    // }),
    // changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
    //   const { id, title } = action.payload
    //   const index = state.findIndex((tl) => tl.id === id)
    //   if (index !== -1) {
    //     state[index].title = title
    //   }
    // }),
    changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
      const { id, filter } = action.payload
      const todolist = state.find((tl) => tl.id === id)
      if (todolist) {
        todolist.filter = filter
      }
    }),
    // setTodolistsAC: create.reducer<{ todolists: Todolist[] }>((_, action) => {
    //   return action.payload.todolists.map((tl) => ({ ...tl, filter: "All" }))
    // }),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolistsTC.fulfilled, (_state, action) => {
        return action.payload.map((tl) => ({ ...tl, filter: "All" }))
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const { id, title } = action.payload
        const index = state.findIndex((tl) => tl.id === id)
        if (index !== -1) {
          state[index].title = title
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.push({
          ...action.payload,
          filter: "All",
        })
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.id)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
  },
})

export const { changeTodolistFilterAC } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors
export const todolistsReducer = todolistsSlice.reducer

export const fetchTodolistsTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_arg, thunkAPI) => {
  try {
    const res = await todolistsApi.getTodolists()
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})
export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (args: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle(args)
      return args
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)
export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (title: string, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(title)
      return res.data.data.item
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)
export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (args: { id: string }, thunkAPI) => {
    try {
      await todolistsApi.deleteTodolist(args.id)
      return args
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  },
)
