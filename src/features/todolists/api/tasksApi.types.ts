import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"

export type GetTasksResponse = {
  items: DomainTask[]
  totalCount: number
  error: string | null
}
export type DomainTask = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}
