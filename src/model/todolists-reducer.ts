import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";


type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
type CreateTodolistAction = ReturnType<typeof createTodolistAC>
type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>
type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

const initialState:Todolist[] = []

export const TodolistsReducer = (state:Todolist[] = initialState, action: Actions):Todolist[] => {
      switch (action.type) {
          case "delete_todolist" : {
              return state.filter(tl=> tl.todolistId !== action.payload.todolistId)
          }
          case "create_todolist" : {
              return [...state, {todolistId: action.payload.todolistId, title: action.payload.title, filter: "All"}]
          }
          case "change_todolist-title": {
              return state.map(tl=> tl.todolistId === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
          }
          case "change_todolist-filter": {
              return state.map(tl => tl.todolistId === action.payload.todolistId ? {...tl, filter:action.payload.filter} : tl)
          }
          default:
              return state
      }
};


export const deleteTodolistAC = (todolistId: string) => {
    return {type: 'delete_todolist', payload: { todolistId }} as const
}

export const createTodolistAC = (title: string) => {
    return {type: 'create_todolist', payload: { todolistId:v1(),title }} as const
}
export const changeTodolistTitleAC = (payload: {todolistId: string,title: string}) => {
    return {type: 'change_todolist-title', payload} as const}
export const changeTodolistFilterAC = (payload: {todolistId:string,  filter: FilterValues}) => {
    return {type: 'change_todolist-filter', payload} as const}
