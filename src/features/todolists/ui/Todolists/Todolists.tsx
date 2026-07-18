import {Grid} from "@mui/material";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/features/todolists/model/todolists-selectors.ts";
import {TodolistItem} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx";

export const Todolists = () => {
    const todolists = useAppSelector(selectTodolists)

    return (
        <>
            {todolists.map(todolist => {
                return (
                    <Grid key={todolist.todolistId}>
                        <TodolistItem todolist={todolist}/>
                    </Grid>
                )
            })}
        </>
    );
};