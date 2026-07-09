import type {Task, TasksState} from '../App'
import {CreateTodolistAction, DeleteTodolistAction} from "./todolists-reducer.ts";
import {v1} from "uuid";


type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>
type Actions = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction

const initialState: TasksState = {}

export const TasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
    switch (action.type) {
        case 'create_todolist': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'delete_todolist': {
            const newState = { ...state }
            delete newState[action.payload.todolistId]
            return newState
        }
        case "delete_task": {
            return {...state, [action.payload.todolistId]:state[action.payload.todolistId].filter(t=> t.id !== action.payload.taskId)}
        }
        case "create_task": {
            const { todolistId, id, title } = action.payload
            const newTask: Task = {id, title, isDone: false}
            return {...state, [todolistId]:[newTask, ...state[todolistId]]}
        }
        case "change_task_Status": {
            const {todolistId,taskId,isDone} = action.payload
            return {...state,[todolistId]: state[todolistId].map(t=> t.id === taskId ? {...t, isDone} : t) }
        }
        case "change_task_Title": {
            const {todolistId,taskId,title} = action.payload
            return {...state,[todolistId]: state[todolistId].map(t=> t.id === taskId ? {...t, title} : t) }
        }
        default:
           return state
    }
}




export const deleteTaskAC = (payload: {todolistId: string, taskId: string}) => {
  return {type: "delete_task", payload} as const}

export const createTaskAC = (payload: {todolistId: string, title: string}) => {
  return {type: "create_task", payload: {...payload, id: v1()}} as const}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean }) => {
  return {type: "change_task_Status", payload} as const
}

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string }) => {
    return {type: "change_task_Title", payload} as const
}