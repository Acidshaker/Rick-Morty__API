import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ResidentCard = ({ urlResident }) => {

  const [resident, setResident] = useState()
  useEffect(() => {
    axios.get(urlResident)
      .then((res) => {
        setResident(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  return (

    <article className='resident__container'>
      <header>
        <img src={resident?.image} alt={`Image of: ${resident?.name}}`} />
        <div className='resident__status--container'>
          <i className={`bx bxs-circle ${resident?.status}`}></i>
          <span>{resident?.status}</span>
        </div>
      </header>
      <section className='resident__body'>
        <h2>{resident?.name}</h2>
        <ul>
          <li><span className='resident__type'>Species: </span>{resident?.species}</li>
          <li><span className='resident__type'>Origin: </span>{resident?.origin.name}</li>
          <li><span className='resident__type'>Episodes where appear: </span>{resident?.episode.length}</li>
        </ul>
      </section>
    </article>

  )
}

export default ResidentCard