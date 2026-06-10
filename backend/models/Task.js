const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'want to add a title']
  },
  description: {
    type: String
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedDate: {
    type: String,
    default: null
  },
  completedTime: {
    type: String,
    default: null
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },

  scheduleDate: { 
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);