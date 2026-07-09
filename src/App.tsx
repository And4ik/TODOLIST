import './App.css'
import {TodolistItem} from "./TodolistItem.tsx";
import {useReducer, useState} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import {containerSx} from "./TodolistItem.styles.ts";
import {NavButton} from "./NavButton.ts";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC, deleteTodolistAC,
    TodolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    TasksReducer
} from "./model/tasks-reducer.ts";

type ThemeMode = 'dark' | 'light'


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

export type TasksState = {
    [key:string] : Task[]
}



export type FilterValues = "All" | "Completed" | "Active"
export const App = ()=> {

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const [todolists, dispatchToTodolists] = useReducer(TodolistsReducer, []);
    const [tasks, dispatchToTasks] = useReducer( TasksReducer,{})

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#d9cdb4',
            },
        },
    })
    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    const createTodolist = (title:string) => {
        const action = createTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const changeTodolistTitle = (payload:{todolistId: string, title: string}) => {
       dispatchToTodolists(changeTodolistTitleAC(payload))
    }

    const changeTodolistFilter = (payload: {todolistId: string,filter:FilterValues}) => {
        dispatchToTodolists(changeTodolistFilterAC(payload))
    }

    const deleteTodolist = (todolistId: string) => {
        const action = deleteTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const deleteTask = (payload:{todolistId: string, taskId: string}) => {
        dispatchToTasks(deleteTaskAC(payload))
    }

    const createTask = (payload:{todolistId: string, title: string}) => {
        dispatchToTasks(createTaskAC(payload))
    }

    const changeTaskStatus = (payload:{todolistId: string, taskId: string, isDone:boolean}) => {
        dispatchToTasks(changeTaskStatusAC(payload))
    }

    const changeTaskTitle = (payload:{todolistId: string, taskId: string, title:string}) => {
        dispatchToTasks(changeTaskTitleAC(payload))
    }

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
              <AppBar position="static"  sx={{ mb: '30px' }}>
                  <Toolbar>
                      <Container maxWidth={"lg"} sx={containerSx} >
                          <IconButton color="inherit">
                              <MenuIcon />
                          </IconButton>
                          <div>
                              <NavButton>Sign in</NavButton>
                              <NavButton>Sign up</NavButton>
                              <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                              <Switch color={'default'} onChange={changeMode} />
                          </div>

                      </Container>
                  </Toolbar>
              </AppBar>
              <Container maxWidth={"lg"}>
                  <Grid container  sx={{ mb: '30px' }}>
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
                                      changeTodolistTitle={changeTodolistTitle}
                                      changeTodolistFilter={changeTodolistFilter}
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
      </ThemeProvider>

  )
}

