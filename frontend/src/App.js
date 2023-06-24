import './styles/index.scss'
import Navbar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import TaskList from './components/TaskList'


function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="task-app">
        <div className="task-principal-list">
          <h1 className="con-title">My To Do's</h1>
          <TaskList />
        </div>
      </div>
    </div>
  )
}

export default App
