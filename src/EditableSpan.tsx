import {useState} from "react";

type Props = {
    value:string
    onChange: (title: string) => void
};
export const EditableSpan = ({value,onChange}: Props) => {
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
            {isEditMode
                ? <input
                    value={title}
                    onBlur={turnOffEditMode}
                    autoFocus
                    onChange={(e)=>setTitle(e.currentTarget.value)}/>
                : <span onDoubleClick={turnOnEditMode}>{value}</span> }
        </>
    );
};