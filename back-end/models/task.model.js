const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    title: String,
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'pending' },  // 'pending', 'in-progress', 'completed'
    dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]  // Task dependencies
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
