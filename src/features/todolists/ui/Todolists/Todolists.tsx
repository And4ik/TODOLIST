import { Grid } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useEffect } from "react"
import { fetchTodolistsTC, selectTodolists } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchTodolistsTC())
  }, [])
  return (
    <>
      {todolists.map((todolist) => {
        return (
          <Grid key={todolist.id}>
            <TodolistItem todolist={todolist} />
          </Grid>
        )
      })}
    </>
  )
}
