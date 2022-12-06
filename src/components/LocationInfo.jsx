import React from 'react'
import ErrorMessage from './ErrorMessage'

const LocationInfo = ({ dimension, showError, getDataDimension, errorMsg }) => {

  const handlePrev = () => {
    getDataDimension(dimension.id - 1)
  }

  const handleNext = () => {
    getDataDimension(dimension.id + 1)
  }

  const hiddenPrev = () => {
    if (dimension.id == 1) {
      return "btn__hidden"
    }
    else {
      return ""
    }
  }

  const hiddenNext = () => {
    if (dimension.id == 126) {
      return "btn__hidden"
    }
    else {
      return ""
    }
  }
  console.log(errorMsg)

  return (
    <article className='dimension__info'>
      {
        showError ? <ErrorMessage errorMsg={errorMsg} /> : (
          <>
            <div className='dimension__header--container'>
              <div className={`btn__container ${hiddenPrev()}`}>
                <i className='bx bxs-left-arrow btn__prev btn__dimension' onClick={handlePrev}></i>
                <p>Previous dimension</p>
              </div>
              <h2 className='dimension__info--title'>{dimension?.name}</h2>
              <div className={`btn__container ${hiddenNext()}`}>
                <i className='bx bxs-right-arrow btn__next btn__dimension' onClick={handleNext}></i>
                <p>Next dimension</p>
              </div>
            </div>
            <ul className='list__info'>
              <li><span className='list__param'>Type: </span>{dimension?.type}</li>
              <li><span className='list__param'>Id: </span>{dimension?.id}</li>
              <li><span className='list__param'>Dimension: </span>{dimension?.dimension}</li>
              <li><span className='list__param'>Population: </span>{dimension?.residents.length}</li>
            </ul>
          </>
        )
      }
    </article>
  )
}

export default LocationInfo