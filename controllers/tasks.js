const Task = require('../models/tasks')
const asyncWrapper = require('../middleware/asyncWrapper')
const {creatCustomError, createCustomError} = require('../custome-error/errors')

const getAllTask = asyncWrapper (async (req, res)=>{
   const tasks = await Task.find({})
   const MyTasks = tasks.map((task)=>{
      const {_id, name, completed} = task
      return {_id, name, completed}
   })
   res.status(200).json({MyTasks})
})

const createNewTask = asyncWrapper (async (req, res)=>{
   const task = await Task.create(req.body)
   const {_id, name, completed} = task
   res.status(201).json({_id, name, completed})
})

const getSingleTask = asyncWrapper (async (req, res, next)=>{
   const {id:TaskID} = req.params
   const task = await Task.findOne({_id:TaskID })
   if(!task){
      return next(createCustomError(`No task with ID : ${TaskID} was found`, 404))
   }
   const {_id, name, completed} = task
   return res.status(200).json({MyTask:{_id, name, completed}})
})

const updateTask = asyncWrapper (async (req, res, next)=>{
   const {id:TaskID} = req.params
   const task = await Task.findOneAndUpdate({_id:TaskID},req.body,{
      new: true,
      runValidators: true
   })
   if(!task){
      return next(createCustomError(`No task with ID : ${TaskID} was found`, 404))
   }
   else{
      const {_id, name, completed} = task
      return res.status(200).json({status: 'success', MyTask:{_id, name, completed}})
   }
})
const deleteTask = asyncWrapper (async (req, res, next)=>{
   const {id:TaskID} = req.params
   const task = await Task.findOneAndDelete({_id:TaskID })
   if(!task){
      return next(createCustomError(`No task with ID : ${TaskID} was found`, 404))
   }
   else{
      return res.status(200).json({task: null, status:'success'})
   } 
})

module.exports = {
   getAllTask,
   createNewTask,
   getSingleTask,
   updateTask,
   deleteTask
}