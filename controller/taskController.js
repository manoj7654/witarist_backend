const {TaskModal}=require("../modals/taskModal");


const addTask=async(req,res)=>{
    try {
        const task = new TaskModal(req.body);
        await task.save()
        res.status(201).json({message:"Task Created Successfully"});
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}
const getTask=async(req,res)=>{
  try {
    // Fetch tasks
    const tasks = await TaskModal.find();

    // Sort tasks by priority (high to low)
    tasks.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    // Update tasks with priority
    tasks.forEach(async (task, index) => {
      const priority = index < tasks.length / 3 ? 'high' : index < (2 * tasks.length) / 3 ? 'medium' : 'low';
      task.priority = priority;
      await task.save();
    });
     res.json(tasks);
    console.log('Tasks prioritized successfully');
  } catch (err) {
    console.error('Error prioritizing tasks:', err.message);
  }
}
const updateTask=async(req,res)=>{
    const Id=req.params.id;
    const body=req.body;
    try {
        const task = await TaskModal.findByIdAndUpdate({ _id: Id }, body);
        res.json({message:"Task update successfully"});
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}

const deleteTask=async(req,res)=>{
    const Id=req.params.id
    try {
        await TaskModal.findByIdAndDelete(Id);
        res.json({ message: 'Task deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

module.exports={addTask,getTask,deleteTask,updateTask}