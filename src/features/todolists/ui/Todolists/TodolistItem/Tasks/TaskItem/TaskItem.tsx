import ListItem from "@mui/material/ListItem"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTaskStatusTC, changeTaskTitleTC, deleteTaskTC } from "@/features/todolists/model/tasks-slice.ts"
import { ChangeEvent } from "react"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts"
import { useAppDispatch } from "@/common/hooks"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"

type Props = {
  task: DomainTask
  todolistId: string
}
export const TaskItem = ({ task, todolistId }: Props) => {
  const dispatch = useAppDispatch()
  const deleteTask = () => {
    dispatch(deleteTaskTC({ todolistId, taskId: task.id }))
  }
  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(changeTaskStatusTC({ ...task, status }))
  }
  const changeTaskTitle = (title: string) => {
    dispatch(changeTaskTitleTC({ ...task, title }))
  }
  const done = task.status === TaskStatus.Completed

  return (
    <ListItem sx={getListItemSx(done)}>
      <div>
        <Checkbox checked={done} onChange={changeTaskStatus} />
        <EditableSpan value={task.title} onChange={changeTaskTitle} />
      </div>

      <IconButton onClick={deleteTask}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
