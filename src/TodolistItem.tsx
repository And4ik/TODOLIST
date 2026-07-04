import {FilterValues, Task, Todolist} from "./App.tsx";
import './App.css'
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {ChangeEvent} from "react";
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Checkbox from "@mui/material/Checkbox";
import Box from '@mui/material/Box'
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
};
export const TodolistItem = (props: Props) => {
    const {
        todolist: {todolistId, title, filter},
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist,
        changeTaskTitle
    } = props

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(todolistId, filter)
    }
    const deleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }
    return (
        <div className={"todolistItem"}>
            <div className={"container"}>
                <h3>{title}</h3>
                {/*<Button title={"del"} onClick={deleteTodolistHandler}/>*/}
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <CreateItemForm onCreateItem={(title) => createTask(todolistId, title)}/>
            {tasks.length === 0
                ? <span> No tasks </span>
                : <List>
                    {tasks.map((t) => {
                        const deleteTaskHandler = () => {
                            deleteTask(todolistId, t.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(todolistId, t.id, e.currentTarget.checked)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(todolistId, t.id, title)
                        }
                        return (
                            <ListItem sx={getListItemSx(t.isDone)} key={t.id}>
                                <div>
                                    <Checkbox checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={t.title} onChange={changeTaskTitleHandler}/>
                                </div>

                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>}
            <Box sx={containerSx}>
                <Button variant={filter === 'All' ? 'contained' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('All')}>All</Button>
                <Button variant={filter === 'Active' ? 'contained' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('Active')}>Active</Button>
                <Button variant={filter === 'Completed' ? 'contained' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('Completed')}>Completed</Button>
            </Box>
        </div>
    );
};