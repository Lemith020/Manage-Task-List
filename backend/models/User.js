const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'insert name'] 
  },
  email: { 
    type: String, 
    required: [true, 'insert email'], 
    unique: true 
  },
  password: { 
    type: String, 
    required: [true, 'insert password'] 
  }
}, { 
  timestamps: true
});


module.exports = mongoose.model('User', userSchema);