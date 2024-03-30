const express=require("express");
const taskRouter=express.Router();
const { addTask,getTask,deleteTask,updateTask} = require("../controller/taskController")

//basic routes for task
taskRouter.get("/task",(req,res)=>{
    res.send("Hello from task App")
})

// for add task
taskRouter.post("/add",addTask)

// for getting all task
taskRouter.get("/allTask",getTask)

// delete task
taskRouter.delete("/remove/:id",deleteTask)

// update task
taskRouter.patch("/edit/:id",updateTask)


module.exports={taskRouter}