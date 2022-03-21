const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Must provide a valid name'],
      trim: true,
      maxlength: [20, 'Name must be < 21']
   },
   completed: {
      type: Boolean,
      default: false
   }
})

module.exports = mongoose.model('Tasks', TaskSchema)