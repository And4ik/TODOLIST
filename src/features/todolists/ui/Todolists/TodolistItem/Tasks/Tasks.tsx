import List from "@mui/material/List";
import {Todolist} from "@/app/App.tsx";
import {selectTasks} from "@/features/todolists/model/tasks-selectors.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {TaskItem} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx";

type Props = {
    todolist: Todolist
};
export const Tasks = ({todolist}: Props) => {
    const {todolistId,filter} = todolist

    const tasks = useAppSelector(selectTasks)


    const todolistTasks = tasks[todolistId]
    let filteredTasks = todolistTasks
    if (filter === "Active") {
        filteredTasks = todolistTasks.filter(t => !t.isDone)
    }
    if (filter === "Completed"){
        filteredTasks = todolistTasks.filter(t=> t.isDone)
    }
    return (
       <>
           {filteredTasks.length === 0
               ? <span> No tasks </span>
               : <List>
                   {filteredTasks.map((t) => {
                       return (
                         <TaskItem key={t.id} task={t} todolistId={todolistId}/>
                       )
                   })}
               </List>}
       </>
    );
};