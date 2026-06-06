import Task from "../models/taskModel.js";

//create Task
export const createTask = async (req, res) => {
    try{
        const { title, description, status } = req.body;
        if(!title){
            return res.status(400).json({ message: "title are required"});
        }
        const newTask = new Task({
            title,
            description,
            userId: req.userId
        })
        await newTask.save();
        return res.status(200).json({ message: "Task created successfully", task: newTask });
    }catch(error){
        console.log("create task error", error);
        return res.status(500).json({message: "create task error"});
    }
}

// get all tasks
export const getAllTasks = async (req, res) => {
    try{
        const alltasks = await Task.find({ userId: req.userId});
        return res.status(200).json({ message: "Tasks fetched successfully", tasks: alltasks });

    }catch(error){
        console.log("get all tasks error", error);
        return res.status(500).json({message: "get all tasks error"});
    }
}

// get task by id
export const getTaskById = async (req, res) => {
    try{
        const { id } = req.params;
        const task = await Task.findOne({
    _id: id,
    userId: req.userId
});
        if(!task){
            return res.status(404).json({ message: "Task not found"});
        } 
        return res.status(200).json({ message: "Task fetched successfully", task });
    }catch(error){
        return res.status(500).json({message: "get task by id error"});
    }
}

//update task
export const updateTask = async (req, res) =>{
    try{
        const { id } = req.params;
        const { title, description, status } = req.body;
        const task = await Task.findById(id);

if (!task) {
    return res.status(404).json({ message: "Task not found" });
}

if (task.userId.toString() !== req.userId) {
    return res.status(403).json({ message: "Unauthorized" });
}

task.title = title || task.title;
task.description = description || task.description;
task.status = status || task.status;

await task.save();
        return res.status(200).json({ message: "Task updated successfully", task });
    }catch(error){
        return res.status(500).json({message: "update task error"});
    }
}

// delete task
export const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (task.userId.toString() !== req.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await Task.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Delete task error"
        });
    }
};