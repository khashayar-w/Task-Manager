import { useEffect, useState } from "react";
import { getTask, deleteTask, updateTask } from "../Services/api";
function TaskList() {
  //* state
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null); //* state برای تسک در حال ویرایش
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
  }); //* فرم داده‌ها

  //* functions
  const fetchData = async () => {
    try {
      const result = await getTask();
      if (result && Array.isArray(result)) {
        setTasks(result);
      } else {
        console.error("Invalid data received from API");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this task?"
      );
      if (!confirmation) return;

      setLoading(true);
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  };

  const editHandler = (task) => {
    setEditingTask(task); //* تسک در حال ویرایش را تنظیم می‌کنیم
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const submitEditHandler = async (e) => {
    e.preventDefault();
    try {
      await updateTask(editingTask.id, formData); //* درخواست آپدیت به سرور
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...formData } : task
        )
      );
      setEditingTask(null); // *بعد از ویرایش تسک، ویرایش را تمام می‌کنیم
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="d-flex flex-wrap flex-column justify-content-center align-items-center">
      <h3>Task List</h3>
      {loading && <p>Deleting task...</p>}

      {/* اینجا جدول را داخل div با کلاس table-responsive قرار دهید */}
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="bg-danger">{task.id}</td>
                <td className="table-warning">{task.title}</td>
                <td className="table-info">{task.description}</td>
                <td className="table-success">{task.status}</td>
                <td className="table-light">
                  <button
                    className="btn btn-outline-danger p-1 m-1"
                    onClick={() => deleteHandler(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-outline-warning p-1 m-1"
                    onClick={() => editHandler(task)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingTask && (
        <div className="edit-form">
          {/* فرم ویرایش */}
          <h4>Edit Task</h4>
          <form onSubmit={submitEditHandler}>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="form-control mb-4"
                required
              >
                <option value="In progress">In progress</option>
                <option value="Finished">Finished</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success p-1 m-1">
              Save Changes
            </button>
            <button
              type="button"
              className="btn btn-secondary p-1 m-1"
              onClick={() => setEditingTask(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default TaskList;
