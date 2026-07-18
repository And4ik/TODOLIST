import { beforeEach, expect, test } from 'vitest'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC, todolistsReducer,

} from "./todolists-reducer.ts";
import {Todolist} from "../app/App.tsx";
import {nanoid} from "@reduxjs/toolkit";

let todolistId1: string
let todolistId2: string
let startState: Todolist[] = []

beforeEach(() => {
    todolistId1 = nanoid()
    todolistId2 = nanoid()

    startState = [
        { todolistId: todolistId1, title: 'What to learn', filter: 'All' },
        { todolistId: todolistId2, title: 'What to buy', filter: 'All' },
    ]
})

test('correct todolist should be deleted', () => {
    const endState = todolistsReducer(startState, deleteTodolistAC({todolistId:todolistId1}))

    expect(endState.length).toBe(1)
    expect(endState[0].todolistId).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    const title = 'New todolist'
    const endState = todolistsReducer(startState, createTodolistAC(title));

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})

test("change todolist title", ()=> {
    const title = "New title"
    const endState = todolistsReducer(startState, changeTodolistTitleAC({todolistId:todolistId2, title}))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe("New title")
})

test('correct todolist should change its filter', () => {
    const filter = 'Completed'
    const endState = todolistsReducer(startState, changeTodolistFilterAC({todolistId: todolistId2, filter}));

    expect(endState[0].filter).toBe('All')
    expect(endState[1].filter).toBe(filter)
})