const mongoose = require('mongoose');

const ProgressSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completedTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    achievements: [{ type: String }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Progress', ProgressSchema);
