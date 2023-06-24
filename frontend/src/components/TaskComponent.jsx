import React, { useState } from 'react';
import { AiOutlineCloseCircle, AiFillEdit } from 'react-icons/ai';

let Task = ({ id, label, complete, completeTask, deleteTask, modifyTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newLabel, setNewLabel] = useState(label);

    const handleInputChange = (event) => {
        setNewLabel(event.target.value);
    };

    const handleInputBlur = () => {
        if (newLabel !== label) {
            modifyTask(id, { label: newLabel });
        }
        setIsEditing(false);
    };

    const handleIconClick = () => {
        setIsEditing(true);
    };

    return (
        <div className={complete ? 'task-container complete' : 'task-container'}>
            {isEditing ? (
                <input
                    type="text"
                    value={newLabel}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    autoFocus
                />
            ) : (
                <div
                    className="task-text"
                    onClick={() => completeTask(id)}>
                    {label}
                </div>
            )}
            <div
                className="task-icon-container"
                onClick={handleIconClick}>
                <AiFillEdit className="task-icon" />
            </div>
            <div
                className="task-icon-container"
                onClick={() => deleteTask(id, label)}>
                <AiOutlineCloseCircle className="task-icon" />
            </div>
        </div>
    );
}

export default Task;
