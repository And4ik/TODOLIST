
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";
import {FilterValues, Todolist} from "@/app/App.tsx";

const initialState:Todolist[] = []

export const deleteTodolistAC = createAction<{todolistId: string}>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: { todolistId: nanoid(), title}}
})
export const changeTodolistTitleAC = createAction<{todolistId: string, title: string}>('todolists/changeTodolistTitle')
export const changeTodolistFilterAC = createAction<{todolistId: string, filter: FilterValues}>('todolists/changeTodolistFilter')

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(tl => tl.todolistId === action.payload.todolistId)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action)=> {
            state.push({...action.payload, filter: "All"})
        })
        .addCase(changeTodolistTitleAC, (state, action)=> {
            const {todolistId,title} = action.payload
            const index = state.findIndex(tl => tl.todolistId === todolistId)
            if (index !== -1){
                state[index].title = title
            }
        })
        .addCase(changeTodolistFilterAC,(state, action)=>{
            const {todolistId,filter} = action.payload
            const todolist = state.find(tl => tl.todolistId === todolistId)
            if (todolist){
                todolist.filter = filter
            }
        })
})

