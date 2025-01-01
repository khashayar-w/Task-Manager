const pool = require('../server')
const {DataBaseError} = require('../Errors/Custom-errors')
class TasksModel{

    static getTask = async(id)=>{

        try{
            const [task] = await pool.query('select * from node_project.tasks where id = ?',[id])
            if(task.length === 0 || !task){
                throw new DataBaseError(`task with this id:${id}  not found`,404)
            }
            return task
        }catch(error){
            throw new DataBaseError(error.message || 'Data base error occurred')
        }
    }



    static getTasks = async()=>{
        try {
            const [tasks] = await pool.query('select * from node_project.tasks')
                if(!tasks || tasks.length === 0){
                 throw new DataBaseError('No tasks found in the database',404)
                }
            return tasks
        } catch (error) {
            throw new DataBaseError (error.message || 'Database error occurred')
        }
    };
    static addTask = async(title,description,status)=>{
        try {
            const [result] = await pool.query('insert into node_project.tasks (title,description,status) values(?,?,?)',[title,description,status])
            if(result.affectedRows === 0){
                throw new DataBaseError('Failed to add the new task  to the database')
            }
            return {
                task: await this.getTask(result.insertId)
            };
        } catch (error) {
            throw new DataBaseError(error.message || "Database error occurred")
        }
    };


    static updateTask = async(iD ,title , description ,status )=>{
        try {
                const [isItExist] = await pool.query('select * from node_project.tasks where id=?',[iD]);
                if(!isItExist || isItExist.length === 0){
                    throw new DataBaseError(`task with id:${iD} not found`,404)
                }  
                const [update] = await pool.query('update node_project.tasks set title=? ,description=? ,status=? where id=?' ,[title , description , status , iD])
                
                if(update.affectedRows === 0 ){
                    throw new DataBaseError(`Failed to update task,please try again`)
                }
                return{
                    task: await this.getTask(iD)
                }
        } catch (error) {
            throw new DataBaseError(error.message || "Database error occurred");
        }
    };

    static deleteTask = async(iD)=>{
        try {
            const [isItExist] = await pool.query('select * from node_project.tasks where id=?',[iD])
            if(!isItExist || isItExist.length === 0){
                throw new DataBaseError(`Task with  id:${iD} not found`,404)
            }
            const [result] = await pool.query('delete from node_project.tasks where id=?',[iD])
            if(result.affectedRows === 0){
                throw new DataBaseError(
                  "Failed to delete task. Please try again"
                ,500);
            }
            return{
                task:await this.getTasks()
            }
            
        } catch (error) {
            throw new DataBaseError(error.message || "Database error occurred")
        }
    }
}


module.exports = TasksModel