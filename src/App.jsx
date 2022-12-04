import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loader from './components/Loader'
import LocationFilter from './components/LocationFilter'
import LocationInfo from './components/LocationInfo'
import NotPopulation from './components/NotPopulation'
import ResidentCard from './components/ResidentCard'
import getRandomNumber from "./utils/getRandomNumber"

function App() {

  // Estados

  // Estado para almacenar un response de la API
  const [dimension, setDimension] = useState()
  // Estado para almacenar una dimensión por su nombre
  const [locationName, setLocationName] = useState()
  // Estado para almacenar el valor de un mensaje de error
  const [showError, setshowError] = useState(false)
  // Estado para almacenar una URL
  const [newUrl, setnewUrl] = useState()
  // Estado para cargar el loader
  const [loader, setLoader] = useState()

  // funcion para obtener un numero aleatorio por defecto del 1-126

  const randomDimension = getRandomNumber()

  // funcion para hacer la peticion a la API por número

  const getDataDimension = (idDimension) => {
    setLoader(true)
    if (idDimension) {
      const URL = `https://rickandmortyapi.com/api/location/${idDimension}`
      axios.get(URL)
        .then((res) => {
          setTimeout(() => {
            setDimension(res.data)
            setLoader(false)
          }, 3000)
        })
        .catch((err) => {
          console.log(err)
          console.log(err.response.data.error)
          console.log(err.response.data.status)
        })
    }
    else {
      setshowError(true)
      // setTimeout(() => {
      //   setshowError(false)
      // }, 1000)
    }
  }

  // useEffect que recibe la funcion de peticion con el parametro de un numero aleatorio del 1-126

  useEffect(() => {
    getDataDimension(randomDimension)
  }, [])


  // funcion manejadora para hacer una peticion al API de acuerdo al nuevo valor del input

  const getNewLocation = (url, name) => {
    setLocationName(name)
    setnewUrl(url)
  }


  // funcion que obtiene el valor del input y lo pasa como parametro para hacer una peticion a la API

  const handlesubmit = (event) => {
    event.preventDefault()
    setshowError(false)
    const searchValue = event.target.searchValue.value
    if (isNaN(+searchValue)) {
      axios.get(newUrl)
        .then((res) => {
          setLoader(true)
          setTimeout(() => {
            setDimension(res.data)
            setLoader(false)
          }, 3000)
        })
        .catch((err) => {
          console.log(err)
          console.log(err.response.data.error)
          console.log(err.response.data.status)
        })
    }
    else {
      setLoader(true)
      getDataDimension(searchValue)
    }
    setLocationName()

  }


  // funcion manejadora para obtener el valor onChange del input

  const handleChangeInput = (event) => {
    setLocationName(event.target.value)
  }




  //bg-img${getRandomNumber(5)}.jpg

  return (
    <div className="App">
      {
        dimension ? (
          <>
            <div className='header__img'>
              <img src="https://i.postimg.cc/sgqJvw7w/image3.jpg" alt="Background image Rick & morty" />
            </div>
            <div className='form__container'>
              <form className='form__flex' onSubmit={handlesubmit} >
                <div className='filter__container'>
                  <input id='searchValue' type="text" value={locationName} onChange={handleChangeInput} placeholder='search your dimension' className='input__search' />
                  <LocationFilter locationName={locationName} getNewLocation={getNewLocation} />
                </div>
                <button className='btn__search' type='submit'>Search</button>
              </form>
            </div>

            <LocationInfo dimension={dimension} showError={showError} getDataDimension={getDataDimension} />

            <section className='cards__container'>
              {
                loader ? <Loader /> : (dimension?.residents.length ? dimension?.residents.map(urlResident => <ResidentCard key={urlResident} urlResident={urlResident} />) : <NotPopulation />)
              }
            </section>
          </>
        ) : <div className='flex__container'> <Loader /> </div>
      }

    </div>
  )
}

export default App
