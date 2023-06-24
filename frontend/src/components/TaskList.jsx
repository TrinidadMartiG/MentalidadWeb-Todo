import React, { useState, useEffect } from 'react'
import '../styles/TaskListStyles.scss'
import Task from './TaskComponent'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { fetchTasks, modifyTask, addTask, deleteTask } from '../api/api.js';


let TaskList = () => {
  const [tasks, setTasks] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch((error) => console.error(error))
  },[])

  const handleModifyTask = (id, newData) => {
    modifyTask(id, newData)
    .then((updatedTask) => {
      const updatedTasks = tasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
      setTasks(updatedTasks)
      console.log('Task modified', updatedTasks)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  }

const handleDeleteTask = (id, label) => {
  deleteTask(id)
  .then(()=>{
    const updatedTasks = tasks.filter((task) => task._id !== id)
    setTasks(updatedTasks)
    console.log('Task deleted:', label,'id:',id)
  })
  .catch((error)=>{
    console.log(error)
  });
};

const handleAddTask = (newTask) => {
  addTask(newTask)
  .then((addedTask)=>{
    const updatedTasks  = [...tasks, addedTask]
    setTasks(updatedTasks)
    console.log('New task added:', newTask)
  })
  .catch((error)=>{
    console.log('Error:',error)
  });
};

  const dealChange = (e) => {
    /* extrae valor de campo de texto */
    e.preventDefault()
    setInput(e.target.value)
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

  const handleFormSubmit  = (e) => {
    /* evita que se recarge app completa */
    e.preventDefault()

    const newTask = {
      label: input,
    }
    /*task.onSubmit(newTask);*/
    handleAddTask(newTask)
    setInput('')
    console.log('new task added', newTask)
  }

  return (
    <div>
      <form className="task-form">
        <input
          type="text"
          className="task-input"
          placeholder="Write it here..."
          name="label"
          value={input}
          onChange={dealChange}
        />
        <button className="task-button" onClick={handleFormSubmit }>
         <span className='button-text'>Add</span> 
          <AiOutlinePlusCircle className='icon' />
        </button>
      </form>

      <div className="task-list-container">
        {tasks.map((elm, indx) => (
          <Task
            key={indx}
            /* debe tener un key para que react mantenga el orden de la lista */
            id={elm._id}
            label={elm.label}
            complete={elm.complete}
            completeTask={completeTask}
            deleteTask={handleDeleteTask}
            modifyTask={handleModifyTask}
          />
        ))}
      </div>
    </div>
  )
}

export default TaskList
