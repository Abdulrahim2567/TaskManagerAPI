const express = require ('express')
const router = express.Router()

const {
   getAllTask,
   createNewTask,
   getSingleTask,
   updateTask,
   deleteTask
} = require('../controllers/tasks')


router.route('/').get(getAllTask).post(createNewTask)
router.route('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask)

module.exports = router