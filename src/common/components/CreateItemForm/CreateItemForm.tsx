import { type ChangeEvent, type KeyboardEvent, useState } from "react"

import TextField from "@mui/material/TextField"
import AddBoxIcon from "@mui/icons-material/AddBox"
import IconButton from "@mui/material/IconButton"

type Props = {
  onCreateItem: (title: string) => void
}
export const CreateItemForm = ({ onCreateItem }: Props) => {
  const [taskTitle, setTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)
  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
    setError(null)
  }
  const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTaskHandler()
    }
  }
  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()
    if (trimmedTitle !== "") {
      // createTask(todolistId, trimmedTitle)
      onCreateItem(trimmedTitle)
      setTaskTitle("")
    } else {
      setError("Title is required")
    }
  }
  return (
    <div>
      <TextField
        label={"Enter a title"}
        variant="outlined"
        value={taskTitle}
        size={"small"}
        error={!!error}
        helperText={error}
        onChange={changeTaskTitleHandler}
        onKeyDown={createTaskOnEnterHandler}
      />
      <IconButton onClick={createTaskHandler} color={"primary"}>
        <AddBoxIcon />
      </IconButton>
    </div>
  )
}
