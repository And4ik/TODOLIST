import {ThemeMode} from "@/app/app-reducer.ts";
import {RootState} from "@/app/store.ts";


export const selectThemeMode = (state: RootState) :ThemeMode => state.theme.themeMode

