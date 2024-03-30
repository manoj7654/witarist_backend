const express=require("express");

const app=express();


const {connection}=require("./config/db");
require("dotenv").config()


const {taskRouter  } = require("./routes/taskRoute");
const cors=require("cors")

app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.json("Welcome to the task api home page")
})
app.use("/tasks",taskRouter)


app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("Database connected")
    } catch (error) {
        console.log("Getting error while connecting database")
    }

    console.log(`Server is running on port no ${process.env.port}`)
})