import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC } from "@/features/todolists/model/tasks-slice.ts"
import { ChangeEvent } from "react"
import { Task } from "@/app/App.tsx"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts"
import { useAppDispatch } from "@/common/hooks"

type Props = {
  task: Task
  todolistId: string
}
export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()
  const deleteTask = () => {
    dispatch(deleteTaskAC({ todolistId, taskId: task.id }))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC({ todolistId, taskId: task.id, isDone: e.currentTarget.checked }))
  }
  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleAC({ todolistId, taskId: task.id, title }))
  }
  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>

      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
