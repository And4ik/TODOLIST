import Button from "@mui/material/Button"
import { FilterValues, Todolist } from "@/app/App.tsx"
import { changeTodolistFilterAC } from "@/features/todolists/model/todolists-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

import Box from "@mui/material/Box"
import { containerSx } from "@/common/styles/container.styles.ts"

type Props = {
  todolist: Todolist
}
export const FilterButtons = ({ todolist }: Props) => {
  const { todolistId, filter } = todolist
  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({ todolistId, filter }))
  }
  return (
    <Box sx={containerSx}>
      <Button variant={filter === "All" ? "contained" : "text"} color={"primary"} onClick={() => changeFilter("All")}>
        All
      </Button>
      <Button
        variant={filter === "Active" ? "contained" : "text"}
        color={"primary"}
        onClick={() => changeFilter("Active")}
      >
        Active
      </Button>
      <Button
        variant={filter === "Completed" ? "contained" : "text"}
        color={"primary"}
        onClick={() => changeFilter("Completed")}
      >
        Completed
      </Button>
    </Box>
  )
}
