import { useState } from "react"
import TextField from "@mui/material/TextField"

type Props = {
  value: string
  onChange: (title: string) => void
}
export const EditableSpan = ({ value, onChange }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [title, setTitle] = useState(value)

  const turnOnEditMode = () => {
    setIsEditMode(true)
  }

  const turnOffEditMode = () => {
    setIsEditMode(false)
    onChange(title)
  }

  return (
    <>
      {isEditMode ? (
        <TextField
          variant="outlined"
          value={title}
          size={"small"}
          onBlur={turnOffEditMode}
          autoFocus
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      ) : (
        <span onDoubleClick={turnOnEditMode}>{value}</span>
      )}
    </>
  )
}
