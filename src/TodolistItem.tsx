import {FilterValues, Task, Todolist} from "./App.tsx";
import {Button} from "./Button.tsx";
import './App.css'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {ChangeEvent} from "react";


type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, id:string)=> void
    changeFilter:(todolistId: string, filter:FilterValues)=> void
    createTask: (todolistId: string, title:string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone:boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title:string) => void
};
export const TodolistItem = (props: Props) => {
    const {todolist: {todolistId, title, filter}, tasks, deleteTask,changeFilter,createTask,changeTaskStatus,deleteTodolist,changeTaskTitle} = props


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
            <CreateItemForm onCreateItem={(title)=>createTask(todolistId,title)}/>


            {tasks.length === 0
                ? <span> No tasks </span>
                : <ul>
                    {tasks.map((t)=>{
                        const deleteTaskHandler = () => {
                            deleteTask(todolistId, t.id)
                        }
                        const changeTaskStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(todolistId,t.id, e.currentTarget.checked)
                        }
                        const changeTaskTitleHandler = (title:string) => {
                            changeTaskTitle(todolistId,t.id,title)
                        }
                        return (
                            <li className={t.isDone ? "is-done" :""} key={t.id}>
                                <input type="checkbox"
                                       checked={t.isDone}
                                       onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan value={t.title} onChange={changeTaskTitleHandler}/>
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