import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:3000/api/tasks",
    timeout:5000,
    headers:{
        "Content-Type":"application/json"
    }

})



export const getTask = async () => {
  try {
    const response = await api.get("/");
    if (response.status !== 200) {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    if (error.response) {
      console.error(
        "Response error details:",
        error.response.status,
        error.response.data
      );
    } else {
      console.error("Request failed with no response:", error);
    }
    throw error;
  }
};


export const insertData = async(data)=>{
    try {
        const result = await api.post("/",data);
        if(result.status !== 201){
            throw new Error('inserting  data was failed')
        }
        return result.data
    } catch (error) {
        console.error("Error details:",error.message)
        throw error
    }
}



export const updateTask = async(id,data)=>{
    try {
        const result = await api.put(`/${id}`,data);
        if(result.status !== 200 && result.status !== 204){
          throw new Error("Update request was failed.")
        }
        return result.data
        
    } catch (error) {
        console.error("Error details:",error.message);
        throw error
    }
}

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    console.log("Task deleted successfully:", response.data);
    if(response.status !== 200){
        throw new Error("Delete request was failed")
    }
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error.message);
    throw error;
  }
};


export default api;





