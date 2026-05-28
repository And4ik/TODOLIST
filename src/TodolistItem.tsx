import {FilterValues, Task} from "./App.tsx";
import {Button} from "./Button.tsx";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (id:number)=> void
    changeFilter:(filter:FilterValues)=> void
};
export const TodolistItem = (props: Props) => {
    const {title, tasks, deleteTask,changeFilter} = props


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>

            {tasks.length === 0
                ? <span> No tasks </span>
                : <ul>
                    {tasks.map(t =>
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button onClick={() => deleteTask(t.id)} title={"x"}/>
                        </li>
                    )}
                </ul>}
            <div>
                <Button onClick={()=>changeFilter("All")} title="All" />
                <Button onClick={()=>changeFilter("Active")} title="Active" />
                <Button onClick={()=>changeFilter("Completed")} title="Completed" />
            </div>

        </div>
    );
};