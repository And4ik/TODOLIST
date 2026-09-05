import "../../../../../app/App.css"
import { createTaskTC } from "@/features/todolists/model/tasks-slice.ts"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx"
import { CreateItemForm } from "@/common/components"
import { useAppDispatch } from "@/common/hooks"
import { DomainTodolist } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: DomainTodolist
}
export const TodolistItem = ({ todolist }: Props) => {
  const { id } = todolist

  const dispatch = useAppDispatch()

  const createTask = (title: string) => {
    dispatch(createTaskTC({ todolistId: id, title }))
  }
  return (
    <div className={"todolistItem"}>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm onCreateItem={createTask} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
