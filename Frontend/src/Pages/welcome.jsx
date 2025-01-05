import { useState } from "react";
function Welcome() {
  const [showNext, setShowNext] = useState(false);

  const handleNext = () => {
    setShowNext(true);
     
  };

  return (
    <>
      <div className={`container ${showNext ? "next" : ""}`}>
        <div className="card1-1">
          <div className="card-text">
            <h1>Welcome to Task Manager</h1>
            <p>
              Organize your life and boost your productivity with Task Manager,
              the ultimate tool for managing your tasks efficiently. Whether
              you're planning your daily schedule, managing a project, or simply
              tracking your goals, Task Manager is here to help.
            </p>
          </div>
          <button onClick={handleNext}>Next</button>
        </div>
        <div className="card1-2">
          <div className="card-text">
            <h2>Key Features</h2>
            <p>
              Create and Organize Tasks: Easily add tasks and categorize them
              for better organization. Set Deadlines and Reminders: Stay on
              track with due dates and notifications. Dark and Light Mode:
              Choose a theme that suits your preference. User-Friendly
              Interface: Enjoy a clean and intuitive design for effortless
              navigation. Start taking control of your tasks today and achieve
              your goals with ease. Let’s make productivity simple and effective
              together!
            </p>
          </div>
          <button>Start</button>
        </div>
      </div>
    </>
  );
}

export default Welcome;
