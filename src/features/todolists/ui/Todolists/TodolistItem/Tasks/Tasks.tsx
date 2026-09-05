import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { fetchTasksTC, selectTasks } from "@/features/todolists/model/tasks-slice.ts"
import { useEffect } from "react"
import { TaskStatus } from "@/common/enums/enums.ts"

type Props = {
  todolist: DomainTodolist
}
export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id))
  }, [])

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "Active") {
    filteredTasks = todolistTasks.filter((t) => t.status === TaskStatus.New)
  }
  if (filter === "Completed") {
    filteredTasks = todolistTasks.filter((t) => t.status === TaskStatus.Completed)
  }
  return (
    <>
      {filteredTasks?.length === 0 ? (
        <span> No tasks </span>
      ) : (
        <List>
          {filteredTasks?.map((t) => {
            return <TaskItem key={t.id} task={t} todolistId={id} />
          })}
        </List>
      )}
    </>
  )
}
