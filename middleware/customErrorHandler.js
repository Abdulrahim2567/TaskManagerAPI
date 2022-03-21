const {customAPIError} = require('../custome-error/errors')
const customErrorHandler = (err, req, res, next)=>{
   if(err instanceof customAPIError){
      return res.status(err.statusCode).json({msg: err.message})
   }
   return res.status(500).json({msg: 'Something Broke!'})
}

module.exports = customErrorHandler