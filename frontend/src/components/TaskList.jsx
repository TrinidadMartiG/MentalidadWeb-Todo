import React, { useState, useEffect } from 'react'
import Task from './TaskComponent'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { fetchTasks, modifyTask, addTask, deleteTask } from '../api/api.js'

let TaskList = () => {
  const [tasks, setTasks] = useState({})
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetchTasks()
      .then((data) => {
        setTasks(data.tasks)
      })
      .catch((error) => console.error(error))
  }, [])

  const handleModifyTask = (id, newData) => {
    const updatedData = {
      title: newData.title || title,
      description: newData.description || description,
    };
  
    modifyTask(id, updatedData)
      .then((updatedTask) => {
        const updatedTasks = tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        setTasks(updatedTasks);
        console.log('Task modified', updatedTasks);
        
        // Fetch updated tasks after modifying a task
        fetchTasks()
          .then((data) => {
            setTasks(data.tasks);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  const handleDeleteTask = (id, label) => {
    deleteTask(id)
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== id)
        setTasks(updatedTasks)
        console.log('Task deleted:', label, 'id:', id)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleAddTask = () => {
    const newTask = {
      title: title,
      description: description,
      complete: false,
    }

    addTask(newTask)
      .then((addedTask) => {
        const updatedTasks = [...tasks, addedTask]
        setTasks(updatedTasks)
        console.log('New task added:', newTask)
        setTitle('')
        setDescription('')

        // Fetch updated tasks after adding a new task
        fetchTasks()
          .then((data) => {
            setTasks(data.tasks)
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => {
        console.log('Error:', error)
      })
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const completeTask = (id) => {
    const taskUpdated = tasks.map((task) => {
      if (task.id === id) {
        task.complete = !task.complete
      }
      return task
    })
    setTasks(taskUpdated)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    handleAddTask()
    console.log('new task added', { title, description })
  }

  return (
    <div>
      <form className="task-form">
        <input
          type="text"
          className="task-input"
          placeholder="Write your task here..."
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        {title && (
          <input
            type="text"
            className="task-input-description"
            placeholder="Write the description here..."
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        )}
        <button className="task-button" onClick={handleFormSubmit}>
          <span className="button-text">Add</span>
          <AiOutlinePlusCircle className="icon" />
        </button>
      </form>

      <div className="task-list-container">
        {tasks && tasks.length > 0 ? (
          tasks.map((elm, indx) => (
            <Task
              key={indx}
              id={elm.id}
              title={elm.title}
              description={elm.description}
              complete={elm.complete}
              completeTask={completeTask}
              deleteTask={handleDeleteTask}
              modifyTask={handleModifyTask}
            />
          ))
        ) : (
          <p>No tasks added 😔</p>
        )}
      </div>
    </div>
  )
}

export default TaskList
