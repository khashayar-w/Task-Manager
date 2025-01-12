import {  useState } from "react";
import { insertData } from "../Services/api";
import * as yup from "yup"

function CreateTask() {
  //* States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [task, setTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null); 
  //* validation
    const schema = yup.object({
      title: yup
        .string()
        // .matches(/^[a-zA-Z0-9\s]{1-250}$/, "Title must be 1-250 characters")
        .required("title is required"),
      description: yup
        .string()
        // .matches(
        //   /^[a-zA-Z0-9\s]{1-300}$/,
        //   "Description must be 1-300 characters"
        // )
        .required("description is required"),
    });
  //* Functions
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  
  
  const sendData = async (task) => {
    try {
      setIsSubmitting(true); 
      const result = await insertData(task);
      if (!result) {
        console.log("No data received from server");
        setIsSuccess(false);
      } else {
        console.log("Task created successfully:", result);
        setIsSuccess(true); 
      }
    } catch (error) {
      console.error("Error creating task:", error.message);
      setIsSuccess(false); 
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsSuccess(null)
      }, 3000);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newTask = { title, description };
    try {
      await schema.validate(newTask ,{abortEarly:false});
      setTask(newTask); 
      sendData(newTask); 
      setTitle(""); 
      setDescription("");
      console.log("Task submitted:", newTask);
    } catch (validationErrors) {
      console.error("Validation Error:",validationErrors.messages);
      alert(`Validation Errors:\n${validationErrors.errors.join("\n")}`);    
    }
  };



  return (
    <>
      <div className="form-container text-center">
        <div className="title">
          <h1>Add your Task</h1>
        </div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "25vh",
          }}
          onSubmit={handleSubmit}
          className="form"
        >
          <input
            onChange={handleTitleChange}
            id="title"
            type="text"
            value={title}
            autoComplete="off"
            required
          />
          <label htmlFor="title">Title</label>
          <input
            onChange={handleDescriptionChange}
            id="description"
            type="text"
            value={description}
            autoComplete="off"
            required
          />
          <label htmlFor="description">Description</label>
          <button
            className="btn"
            style={{
              backgroundColor:
                isSuccess === true
                  ? "#27ae60"
                  : isSubmitting
                  ? "#e67e22"
                  : "#d63031",
              color: "#ecf0f1",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting..."
              : isSuccess === true
              ? "Success!"
              : isSuccess === false
              ? "Failed"
              : "Add"}
          </button>
        </form>
        {task && (
          <div>
            <h2>Task Details</h2>
            <p>Title: {task.title}</p>
            <p>Description: {task.description}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default CreateTask;
