class customAPIError extends Error{
   constructor(message, statuscode){
      super(message)
      this.statusCode = statuscode
   }
}

const createCustomError = (message, status)=>{
   return new customAPIError(message, status)
}

module.exports = {createCustomError, customAPIError}