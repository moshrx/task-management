const Task = require('../models/task.model');
const Progress = require('../models/progress.model');

exports.create = async (req, res) => {
    try {
        const { title, description, assignedTo, dependencies } = req.body;
        const task = new Task({ title, description, assignedTo, dependencies });
        await task.save();
        
        // Update user progress
        const progress = await Progress.findOne({ user: assignedTo });
        if (progress) {
            progress.completedTasks.push(task._id);
            await progress.save();
        }
        
        res.status(201).send({ message: "Task created successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};

exports.findAll = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo dependencies');
        res.send(tasks);
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};

exports.update = async (req, res) => {
    try {
        const { status } = req.body;
        const task = await Task.findById(req.params.taskId);

        if (!task) {
            return res.status(404).send({ message: "Task not found" });
        }

        task.status = status;
        await task.save();

        // Update user progress
        const progress = await Progress.findOne({ user: task.assignedTo });
        if (progress && status === 'completed') {
            progress.completedTasks.push(task._id);
            await progress.save();
        }

        res.send({ message: "Task updated successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};

exports.delete = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.taskId);
        res.send({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};
