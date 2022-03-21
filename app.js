const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/notFound')
const customErrorHandler = require('./middleware/customErrorHandler')
//json objects
app.use(express.json())
//static pages
app.use(express.static('./public'))
//routes
app.use('/api/v1/tasks', tasks)
//unknown route
app.use(notFound)
//customerError Handler
app.use(customErrorHandler)

const port = process.env.PORT || 3000
//server function
const spinServer = async()=>{
   try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, ()=>{
         console.log(`Listening on port ${port}...`)
      })
   } catch (error) {
      console.log(error);
   }
}
//start server
spinServer()