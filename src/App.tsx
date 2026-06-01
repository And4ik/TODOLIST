import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
export type Task = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValues = "All" | "Completed" | "Active"
export const App = ()=> {
    const [filter, setFilter] = useState<FilterValues>("All")
    const [tasks, setTasks] = useState<Task[]>([
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false }])

    const deleteTask = (id: string) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    const changeFilter = (filter:FilterValues) => {
        setFilter(filter)
    }

    const createTask = (title:string) => {
        const newTask = { id: v1(), title, isDone: false }
        setTasks([newTask, ...tasks])
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
          <TodolistItem title={"Songs"} tasks={filteredTask}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        createTask={createTask}
          />

      </div>
  )
}

