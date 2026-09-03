import List from "@mui/material/List"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { useAppSelector } from "@/common/hooks"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"
import { selectTasks } from "@/features/todolists/model/tasks-slice.ts"

type Props = {
  todolist: DomainTodolist
}
export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "Active") {
    filteredTasks = todolistTasks.filter((t) => !t.isDone)
  }
  if (filter === "Completed") {
    filteredTasks = todolistTasks.filter((t) => t.isDone)
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
