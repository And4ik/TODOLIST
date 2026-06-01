import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";


type Props = {
    title: string
    tasks: Task[]
    deleteTask: (id:string)=> void
    changeFilter:(filter:FilterValues)=> void
    createTask: (title:string) => void
};
export const TodolistItem = (props: Props) => {
    const {title, tasks, deleteTask,changeFilter,createTask} = props

    const [taskTitle, setTaskTitle] = useState("")
    
    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle("")
    }
    const changeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
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
                <input value={taskTitle}
                        onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}
                />
                <Button onClick={createTaskHandler} title={"+"}/>
            </div>

            {tasks.length === 0
                ? <span> No tasks </span>
                : <ul>
                    {tasks.map((t)=>{
                        const deleteTaskHandler = () => {
                            deleteTask(t.id)
                        }
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <Button onClick={deleteTaskHandler} title={"x"}/>
                            </li> 
                        )
                    })}
                </ul>}
            <div>
                <Button onClick={()=>changeFilter("All")} title="All" />
                <Button onClick={()=>changeFilter("Active")} title="Active" />
                <Button onClick={()=>changeFilter("Completed")} title="Completed" />
            </div>

        </div>
    );
};