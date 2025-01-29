
import { Link } from "react-router-dom"
import {useState,useEffect}  from "react"
import {FontAwesomeIcon}from "@fortawesome/react-fontawesome"
import {faSun,faMoon} from "@fortawesome/free-solid-svg-icons"
import "../Styles/navbar.css"

function Navbar(){

  const [theme , setTheme] = useState("light");
  useEffect(()=>{
      document.documentElement.setAttribute("data-theme",theme);
  },[theme])

  const handleTheme = ()=>{
    setTheme((prevTheme)=>(prevTheme === "dark"?"light":"dark"))
  }

    return (
      <nav class="navbar navbar-expand-lg  ">
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
                <Link
                  class="nav-link active text-warning"
                  aria-current="page"
                  to="/add"
                >
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
              <li>
                <button onClick={handleTheme} className="nav-link text-light">
                  theme
                  <FontAwesomeIcon
                    style={{ color: theme === "dark" ? "#686de0" : "#f9ca24" }}
                    icon={theme === "dark" ? faMoon : faSun}
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}
export default Navbar;