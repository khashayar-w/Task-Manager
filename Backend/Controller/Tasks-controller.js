const {tryCatchHandler}=require('../Middlewares/Try-catch-handler')
const Joi = require('joi')
const TasksModel = require('../Models/Tasks-model');
const { CustomError } = require('../Errors/Custom-errors');
const {sendResponse}=require('../Helpers/response-handler')
//*get tasks
const getTasks =tryCatchHandler(async(req,res)=>{
    const result = await TasksModel.getTasks()
    sendResponse(res,200,true,result,'Data received')
});

//*insert task
const addTask = tryCatchHandler(async(req,res)=>{
    //*i used middlewares for validation
    const {title,description} = req.body;
    const result = await TasksModel.addTask(title,description)
    sendResponse(res,201,true,result,'Task created successfully')
});

//*update task

const updateTask = tryCatchHandler(async(req,res)=>{
    const iD = parseInt(req.params.id)
    const{ title , description , status} = req.body;
    const result = await TasksModel.updateTask(iD, title , description , status);
    sendResponse(res,200,true,result,"Task updated successfully")
});


const deleteTask = tryCatchHandler(async(req,res)=>{
    const iD = parseInt(req.params.id)
    const result = await TasksModel.deleteTask(iD);
    sendResponse(res,200,true,result,"task Deleted successfully")
})




module.exports = {
    getTasks,
    addTask,
    updateTask, 
    deleteTask,
}