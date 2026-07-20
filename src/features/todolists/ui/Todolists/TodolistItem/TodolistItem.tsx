import {Todolist} from "@/app/App.tsx";
import '../../../../../app/App.css'
import {createTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";
import {CreateItemForm} from "@/common/components";
import {useAppDispatch} from "@/common/hooks";

type Props = {
    todolist: Todolist
};
export const TodolistItem = ({todolist}: Props) => {
    const {todolistId} = todolist

    const dispatch = useAppDispatch()

    const createTask = (title:string) => {
        dispatch(createTaskAC({todolistId,title}))
    }
    return (
        <div className={"todolistItem"}>
            <TodolistTitle todolist={todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={todolist}/>
            <FilterButtons todolist={todolist}/>
        </div>
    );
};