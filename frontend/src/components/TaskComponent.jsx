import React, { useState } from 'react'
import { AiOutlineCloseCircle, AiFillEdit } from 'react-icons/ai'

const Task = ({
  id,
  title,
  description,
  complete,
  completeTask,
  deleteTask,
  modifyTask,
}) => {
  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(title)
  const [newDescription, setNewDescription] = useState(description)

  const handleTitleInputChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleDescriptionInputChange = (event) => {
    setNewDescription(event.target.value)
  }

  const handleTitleInputBlur = () => {
    if (newTitle !== title) {
      modifyTask(id, { title: newTitle })
    }
    setIsTitleEditing(false)
  }

  const handleDescriptionInputBlur = () => {
    if (newDescription !== description) {
      modifyTask(id, { description: newDescription })
    }
    setIsDescriptionEditing(false)
  }

  const handleTitleIconClick = () => {
    setIsTitleEditing(true)
  }

  const handleDescriptionIconClick = () => {
    setIsDescriptionEditing(true)
  }

  return (
    <div className={complete ? 'task-container complete' : 'task-container'}>
      <div className="taskt-text-container">
        <div className="task-title-container">
          {isTitleEditing ? (
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleInputChange}
              onBlur={handleTitleInputBlur}
              name="title"
              autoFocus
            />
          ) : (
            <>
              <div className="task-title" onClick={() => completeTask(id)}>
                {title}
              </div>
              <div
                className="task-icon-container"
                onClick={handleTitleIconClick}
              >
                <AiFillEdit className="task-icon text-svg" />
              </div>
            </>
          )}
        </div>
        <div className="task-description-container">
          {isDescriptionEditing ? (
            <input
              type="text"
              value={newDescription}
              onChange={handleDescriptionInputChange}
              onBlur={handleDescriptionInputBlur}
              name="description"
              autoFocus
            />
          ) : (
            <>
              <div
                className="task-description"
                onClick={() => completeTask(id)}
              >
                {description}
              </div>
              <div
                className="task-icon-container"
                onClick={handleDescriptionIconClick}
              >
                <AiFillEdit className="task-icon text-svg-description" />
              </div>
            </>
          )}
        </div>
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
