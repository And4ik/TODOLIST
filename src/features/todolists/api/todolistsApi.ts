import { BaseResponse } from "@/common/types"
import { instance } from "@/common/instance"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"

export const todolistsApi = {
  getTodolists() {
    return instance.get<Todolist[]>("/todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}`)
  },
  changeTodolistTitle(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.put<BaseResponse>(`/todo-lists/${todolistId}`, { title })
  },
}
