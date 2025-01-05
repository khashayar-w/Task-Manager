
import { Link } from "react-router-dom"


function Navbar(){
    return(
        <div className="nav-container">
            <div className="logo"></div>
            <div className="links">
                <div className="link">
                    <Link to="/add">Add Task</Link>
                </div>
                <div className="link">
                    <Link to="/list">Task List</Link>
                </div>
            </div>
        </div>
    )
}
export default Navbar;