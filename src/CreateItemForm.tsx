import {Button} from "./Button.tsx";
import {type ChangeEvent, type KeyboardEvent, useState} from "react";


type Props = {
    onCreateItem: (title: string) => void
};
export const CreateItemForm = ({onCreateItem}: Props) => {
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null>(null)
    const changeTaskTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }
    const createTaskOnEnterHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
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
            <input
                className={error ? "error" : ""}
                value={taskTitle}
                onChange={changeTaskTitleHandler}
                onKeyDown={createTaskOnEnterHandler}
            />
            <Button onClick={createTaskHandler} title={"+"}/>
            {error ? <div className={"error-message"}>{error}</div> : ""}
        </div>
    );
};