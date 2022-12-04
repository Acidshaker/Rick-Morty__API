import React from 'react'

const ErrorMessage = () => {
  return (
    <div className='error__container'>
      <img className='img__error' src="./public/morty-error.png" alt="Image error" />
      <h2 className='error__msg'>Sorry not found</h2>
    </div>
  )
}

export default ErrorMessage