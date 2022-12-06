import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LocationFilter = ({ locationName, getNewLocation }) => {
  const [locationsOptions, setLocationsOptions] = useState()

  useEffect(() => {
    if (!locationName) return setLocationsOptions()
    const URL = `https://rickandmortyapi.com/api/location?name=${locationName}`
    axios.get(URL)
      .then((res) => {
        setLocationsOptions(res.data.results)
      })
      .catch((err) => {
        console.log(err)
      })

  }, [locationName])

  const classValue = () => {
    if (locationName) {
      return "animation__list"
    }
    else {
      return ""
    }
  }

  const hiddenList = () => {
    if (!locationName) {
      return "hidden__list"
    }
    else {
      return ""
    }
  }

  return (
    <section>
      <ul className={`filter__list ${hiddenList()}`}>
        {
          locationsOptions?.map(locationOption => (
            <li className={classValue()} key={locationOption.url} onClick={
              (e) => {
                getNewLocation(locationOption.url, locationOption.name)
                setLocationsOptions()
                e.target.parentNode.classList.add("hidden__list")
              }}>{locationOption.name}</li>
          ))
        }
      </ul>
    </section>
  )
}

export default LocationFilter