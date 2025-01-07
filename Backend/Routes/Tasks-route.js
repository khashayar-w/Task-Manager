const express = require('express');
const tasksController = require('../Controller/Tasks-controller')
const route = express.Router();
//*using this middlewares for validation
const {validateIdMiddleware,validateAddTaskMiddleware,validateTaskMiddleware}=require('../Middlewares/validation-middlewares')
//*Routes
route.get('/',tasksController.getTasks);
route.post('/',validateAddTaskMiddleware,tasksController.addTask);
route.put('/:id',validateIdMiddleware,validateTaskMiddleware,tasksController.updateTask);
route.delete('/:id',validateIdMiddleware,tasksController.deleteTask);



module.exports = route;


