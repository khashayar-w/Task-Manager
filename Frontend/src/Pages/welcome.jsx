import "../Styles/welcome-page.css"
import featuresImg from "../Assets/key-features.png"
import{FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight, faChartLine, faMoon, faSignal, faSun} from '@fortawesome/free-solid-svg-icons'
import {faThumbsUp} from "@fortawesome/free-regular-svg-icons"
import {useNavigate} from "react-router-dom"


import {useEffect} from "react"



function Welcome() {
  
  const navigate = useNavigate()
  const handleClick = ()=>{
    navigate('/add')
  };

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("focus-in-contract-bck");
            } else {
              entry.target.classList.remove("focus-in-contract-bck");
            }
          });
        },
        {
          threshold: 0.5, // وقتی 50% المان دیده شد انیمیشن اجرا شود
        }
      );

      const targetElements = document.querySelectorAll(".animate-on-scroll");
      targetElements.forEach((el) => observer.observe(el));

      return () => {
        targetElements.forEach((el) => observer.unobserve(el));
      };
    }, []);



  return (
    <div className="welcome">
      <div className="slide-container">
        <div className="slide-1 animate-on-scroll">
          <h1 id="h1" className="focus-in-contract-bck animate-on-scroll">
            Welcome To Task Manager
          </h1>
        </div>
        <div className="slide-2 ">
          <p>
            Organize your life and boost your productivity with Task Manager,
            the ultimate tool for managing your tasks efficiently. Whether
            you're planning your daily schedule, managing a project, or simply
            tracking your goals,{" "}
          </p>
        </div>
        <div className="slide-3 ">
          <h1 id="h2" className="focus-in-contract-bck animate-on-scroll">
            Key Features
          </h1>
          <p>
            {" "}
            Create and Organize Tasks:
            <p className="focus-in-contract-bck" id="highlight-text">
              {" "}
              Easily add tasks and categorize them for better organization.
              <FontAwesomeIcon style={{ color: "#ffa502" }} icon={faThumbsUp} />
            </p>{" "}
            Set Deadlines and Reminders: Stay on track with due dates and
            notifications.{" "}
            <span style={{ color: "#5352ed", fontWeight: "bold" }}>
              Dark
              <FontAwesomeIcon style={{ color: "#192a56" }} icon={faMoon} />
            </span>{" "}
            and{" "}
            <span style={{ color: "#ff6b81", fontWeight: "bold" }}>
              Light Mode{" "}
              <FontAwesomeIcon style={{ color: "#eccc68" }} icon={faSun} />
            </span>
            : Choose a theme that suits your preference. User-Friendly
            Interface: Enjoy a clean and intuitive design for effortless
            navigation.{" "}
            <span style={{ color: "#8c7ae6" ,fontWeight:"bold" }}>
              Start taking control of your tasks today and achieve your goals
              with ease<FontAwesomeIcon style={{color:"#0097e6"}} icon={faChartLine}/>.
            </span>{" "}
            Let’s make productivity simple and effective together!
          </p>
          <span role="button" tabIndex={0} className="btn-custom"  onClick={handleClick}> let's start <FontAwesomeIcon className="icon-move" icon={faArrowRight} /></span>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
