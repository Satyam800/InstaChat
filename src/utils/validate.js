import React from 'react'

const Validate = (email) => {
  const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
   const isValid=emailRegex.test(email)
   console.log(isValid,email,"isvalid");
  
    return isValid
   }


export default Validate