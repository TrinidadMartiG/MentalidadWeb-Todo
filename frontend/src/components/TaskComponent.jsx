import React, { useState } from 'react'
import { AiOutlineCloseCircle, AiFillEdit } from 'react-icons/ai'

let Task = ({
  id,
  title,
  description,
  complete,
  completeTask,
  deleteTask,
  modifyTask,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newtitle, setNewtitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)

  const handleInputChange = (event) => {
    setNewtitle(event.target.value)
  }
  
  const handleChangeDescription = (event) => {
    setNewDescription(event.target.value)
  }

  const handleInputBlur = () => {
    if (newtitle !== title) {
      modifyTask(id, { title: newtitle})
    }
    setIsEditing(false)
  }
  const handleDescriptionBlur = () => {
    if (newDescription !== description) {
      modifyTask(id, {description: newDescription })
    }
    setIsEditing(false)
  }

  const handleIconClick = () => {
    setIsEditing(true)
  }

  return (
    <div className={complete ? 'task-container complete' : 'task-container'}>
      {isEditing ? (
        <>
        <input
          type="text"
          value={newtitle}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
        <input
          type="text"
          value={newDescription}
          onChange={handleChangeDescription}
          onBlur={handleDescriptionBlur}
        />
        </>
      ) : (
        <div className="task-text" onClick={() => completeTask(id)}>
          {title}
          <div className="task-text description"> {description}</div>
        </div>
      )}
      <div className="task-icon-container" onClick={handleIconClick}>
        <AiFillEdit className="task-icon" />
      </div>
      <div
        className="task-icon-container"
        onClick={() => deleteTask(id, title)}
      >
        <AiOutlineCloseCircle className="task-icon" />
      </div>
    </div>
  )
}

export default Task
