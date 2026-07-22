import "./App.css"
import { ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from "@mui/material"
import { Header } from "@/common/components/Header/Header.tsx"
import { Main } from "@/app/Main.tsx"
import { getTheme } from "@/common/theme/theme.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectThemeMode } from "@/app/app-selectors.ts"

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type Todolist = {
  todolistId: string
  title: string
  filter: FilterValues
}

export type TasksState = {
  [key: string]: Task[]
}

export type FilterValues = "All" | "Completed" | "Active"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}
