const User = require('../models/user.model');
const Progress = require('../models/progress.model');

exports.getUserProgress = async (req, res) => {
    try {
        const userId = req.params.userId;
        const progress = await Progress.findOne({ user: userId }).populate('completedTasks');
        
        if (!progress) {
            return res.status(404).send({ message: "Progress not found" });
        }
        
        res.send(progress);
    } catch (error) {
        res.status(500).send({ message: "Server error", error });
    }
};
