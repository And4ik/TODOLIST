import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
export type Task = {
    id: number
    title: string
    isDone: boolean
}
export type FilterValues = "All" | "Completed" | "Active"
export const App = ()=> {
    const [filter, setFilter] = useState<FilterValues>("All")
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false }])

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    const changeFilter = (filter:FilterValues) => {
        setFilter(filter)
    }

    let filteredTask = tasks
    if (filter === "Active") {
        filteredTask = tasks.filter(t => !t.isDone)
    }
    if (filter === "Completed"){
        filteredTask = tasks.filter(t=> t.isDone)
    }

  return (
      <div className="app">
          <TodolistItem title={"Songs"} tasks={filteredTask} deleteTask={deleteTask} changeFilter={changeFilter}/>

      </div>
  )
}

