import React from 'react'

const ErrorMessage = () => {
  return (
    <div className='error__container'>
      <img className='img__error' src="https://i.postimg.cc/6qXjTYsD/morty-error.png" alt=" Image error" />
      <h3 className='error__msg'>Sorry dimension not found</h3>
    </div>
  )
}

export default ErrorMessage