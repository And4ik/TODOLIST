import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type Todolist = {
    todolistId: string,
    title: string
    filter: FilterValues
}

type TasksState = {
    [key:string] : Task[]
}

export type FilterValues = "All" | "Completed" | "Active"
export const App = ()=> {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Todolist[]>([
        {todolistId: todolistId1, title: "First todo", filter: "All"},
        {todolistId: todolistId2, title: "Second todo", filter: "All"}
    ])


    const [tasks, setTasks] = useState<TasksState>({
        [todolistId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false }
        ],
            [todolistId2]: [
        { id: v1(), title: 'Rest API', isDone: true },
        { id: v1(), title: 'GraphQL', isDone: false },]
    })



    const deleteTask = (todolistId: string,id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)})
        // setTasks(prevState => ({...prevState, [todolistId]: prevState[todolistId].filter(el=> el.id!==id)}))
    }


    const changeFilter = (id: string,filter:FilterValues) => {
        setTodolists(prevState => prevState.map(todo => todo.todolistId === id ? {...todo, filter:filter} : todo))
    }

    const createTask = (todolistId: string, title:string) => {
        const newTask = {id: v1(), title, isDone: false }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone:boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=> t.id === taskId ? {...t, isDone} : t)})
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(td=> td.todolistId !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const createTodolist = (title:string) => {
        const newTodolistId = v1()
        setTodolists([{todolistId: newTodolistId, title, filter: "All"},...todolists])
        setTasks({...tasks,[newTodolistId]:[]})
    }

    const changeTaskTitle = (todolistId: string, taskId: string, title:string) => {
      setTasks({...tasks,[todolistId]:tasks[todolistId].map(t=> t.id === taskId ? {...t, title} : t)})
    }
  return (
      <div className="app">
          <AppBar position="static">
              <Toolbar>
                  <Container maxWidth={"lg"}>
                      <IconButton color="inherit">
                          <MenuIcon />
                      </IconButton>
                      <Button color="inherit">Sign in</Button>
                  </Container>
              </Toolbar>
          </AppBar>
          <Container maxWidth={"lg"}>
              <Grid container>
                  <CreateItemForm onCreateItem={createTodolist}/>
              </Grid>
              <Grid container spacing={4} >
                  {todolists.map(todolist => {
                      const todolistTasks = tasks[todolist.todolistId]
                      let filteredTask = todolistTasks
                      if (todolist.filter === "Active") {
                          filteredTask = todolistTasks.filter(t => !t.isDone)
                      }
                      if (todolist.filter === "Completed"){
                          filteredTask = todolistTasks.filter(t=> t.isDone)
                      }
                      return (
                          <Grid key={todolist.todolistId}>
                                  <TodolistItem
                                      todolist={todolist}
                                      tasks={filteredTask}
                                      deleteTask={deleteTask}
                                      changeFilter={changeFilter}
                                      createTask={createTask}
                                      changeTaskStatus={changeTaskStatus}
                                      deleteTodolist={deleteTodolist}
                                      changeTaskTitle={changeTaskTitle}
                                  />
                          </Grid>
                      )
                  })}
              </Grid>
          </Container>




      </div>
  )
}

