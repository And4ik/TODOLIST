import IconButton from "@mui/material/IconButton"
import { NavButton } from "@/common/components/NavButton/NavButton.ts"
import MenuIcon from "@mui/icons-material/Menu"
import { AppBar, Container, LinearProgress, Switch, Toolbar } from "@mui/material"
import { changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/app-slice.ts"

import { getTheme } from "@/common/theme/theme.ts"
import { containerSx } from "@/common/styles/container.styles.ts"
import { useAppDispatch, useAppSelector } from "@/common/hooks"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const status = useAppSelector(selectStatus)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  const changeMode = () => {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
