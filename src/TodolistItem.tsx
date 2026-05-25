import {Task} from "./App.tsx";
import {Button} from "./Button.tsx";

type Props = {
    title: string
    tasks: Task[]
    date?: string
};
export const TodolistItem = (props: Props) => {
    const {title, tasks, date} = props
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
                        </li>
                    )}
                </ul>}
            <div>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Completed"/>

            </div>
            <div>{date}</div>
        </div>
    );
};