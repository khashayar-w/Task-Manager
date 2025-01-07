const express = require('express')
const app = express()
const morgan = require('morgan')
const tasksRoute = require('./Backend/Routes/Tasks-route')
const errorHandler = require('./Backend/Middlewares/Error-handler')
const cors = require('cors')
require('dotenv').config()

//*middlewares
//?this code below must check again
app.use(cors()) 

app.use(express.json());
app.use('/api/tasks',tasksRoute);
app.use(morgan('dev'));
app.use((req,res)=>{
    res.status(404).json({message:'Route not found'});
});


app.use(errorHandler);


//*for unexpected errors we use:
process.on('uncaughtException',(err)=>{
    console.error('there was an uncaught error:',err);
    process.exit(1)
});
process.on('unhandledRejection',(promise ,reason)=>{
    console.err('unhandled Rejection:',promise,'reason:',reason);
});



const port = process.env.APP_PORT || 5500
app.listen(port,(err)=>{
    if(err){
        console.error(`Error starting server:${err.message}`);
    }else{
        console.log(`we are listening to ${port}`)
    }
})