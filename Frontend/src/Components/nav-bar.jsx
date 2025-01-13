
import { Link } from "react-router-dom"
import "../Styles/navbar.css"

function Navbar(){
    return (
      <nav class="navbar navbar-expand-lg bg-primary ">
        <div class="container-fluid">
          <a class="navbar-brand text-white bg-dark p-2 rounded" href="#">
            Task Manager
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active text-warning" aria-current="page" to="/add">
                  Add Task
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link text-light" to="/list">
                  Task list
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}
export default Navbar;