import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";
import './App.css'

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (id:string)=> void
    changeFilter:(filter:FilterValues)=> void
    createTask: (title:string) => void
    changeTaskStatus: (id:string, isDone:boolean) => void
    filter: FilterValues
};
export const TodolistItem = (props: Props) => {
    const {title, tasks, deleteTask,changeFilter,createTask,changeTaskStatus,filter} = props

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    
    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== "") {
            createTask(trimmedTitle)
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
    return (
        <div>
            <h3>{title}</h3>
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
                            deleteTask(t.id)
                        }
                        return (
                            <li className={t.isDone ? "is-done" :""} key={t.id}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={(e)=>changeTaskStatus(t.id, e.currentTarget.checked)}
                                />
                                <span>{t.title}</span>
                                <Button onClick={deleteTaskHandler} title={"x"}/>
                            </li> 
                        )
                    })}
                </ul>}
            <div>
                <Button className={filter === "All" ? "active-filter": ""} onClick={()=>changeFilter("All")} title="All" />
                <Button className={filter === "Active" ? "active-filter": ""} onClick={()=>changeFilter("Active")} title="Active" />
                <Button className={filter === "Completed" ? "active-filter": ""} onClick={()=>changeFilter("Completed")} title="Completed" />
            </div>

        </div>
    );
};