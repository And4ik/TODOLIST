import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import './App.css'

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, id:string)=> void
    changeFilter:(todolistId: string, filter:FilterValues)=> void
    createTask: (todolistId: string, title:string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone:boolean) => void
    deleteTodolist: (todolistId: string) => void
};
export const TodolistItem = (props: Props) => {
    const {todolist: {todolistId, title, filter}, tasks, deleteTask,changeFilter,createTask,changeTaskStatus,deleteTodolist} = props

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    
    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== "") {
            createTask(todolistId, trimmedTitle)
            setTaskTitle("")

        } else {
            setError("Title is required")
        }

    }
    const changeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const createTaskOnEnterHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            createTaskHandler()
        }
    }
    const changeFilterHandler = (filter: FilterValues) => {
      changeFilter(todolistId, filter)
    }
    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }
    return (
        <div>
            <div className={"container"}>
                <h3>{title}</h3>
                <Button title={"del"} onClick={deleteTodolistHandler}/>
            </div>

            <div>
                <input
                    className={error ? "error" : ""}
                    value={taskTitle}
                        onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}
                />
                <Button onClick={createTaskHandler} title={"+"}/>
                {error ? <div className={"error-message"}>{error}</div> : ""}
            </div>

            {tasks.length === 0
                ? <span> No tasks </span>
                : <ul>
                    {tasks.map((t)=>{
                        const deleteTaskHandler = () => {
                            deleteTask(todolistId, t.id)
                        }
                        return (
                            <li className={t.isDone ? "is-done" :""} key={t.id}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={(e)=>changeTaskStatus(todolistId,t.id, e.currentTarget.checked)}
                                />
                                <span>{t.title}</span>
                                <Button onClick={deleteTaskHandler} title={"x"}/>
                            </li> 
                        )
                    })}
                </ul>}
            <div>
                <Button className={filter === "All" ? "active-filter": ""} onClick={()=>changeFilterHandler("All")} title="All" />
                <Button className={filter === "Active" ? "active-filter": ""} onClick={()=>changeFilterHandler("Active")} title="Active" />
                <Button className={filter === "Completed" ? "active-filter": ""} onClick={()=>changeFilterHandler("Completed")} title="Completed" />
            </div>

        </div>
    );
};