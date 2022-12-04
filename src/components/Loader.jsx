import React from 'react'

const Loader = () => {
  return (
    <div className='loader__content'>
      <img src="./public/portal-rick-and-morty.gif" alt="Portal image Rick and Morty" />
      <img src="./public/loading.png" alt="Loading image" className='loading' />
    </div>
  )
}

export default Loader