import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import Welcome from "./Pages/welcome"
import CreateTask from "./Pages/create-task"
import TaskList from "./Pages/task-list"
import Navbar from "./Components/nav-bar"

function App() {

  return (
    <>
      <Router> 
      <Navbar/> 
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/add" element={<CreateTask/>}/>
          <Route path="/list" element={<TaskList/>}/>
          <Route path="*" element={<h1>Nothing Found</h1>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
