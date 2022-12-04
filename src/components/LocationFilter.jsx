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
    else if ((locationsOptions?.some(locationOption => locationOption.name === locationName))) {
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
              () => {
                getNewLocation(locationOption.url, locationOption.name)
                setLocationsOptions()
              }}>{locationOption.name}</li>
          ))
        }
      </ul>
    </section>
  )
}

export default LocationFilter