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
  // Estado para cargar audio
  const [currentlySong, setCurrentlySong] = useState(0)
  // Estado para obtener la cancion actual
  const [songName, setSongName] = useState("Evil Morty Song")

  // funcion para obtener un numero aleatorio por defecto del 1-126

  const randomDimension = getRandomNumber()

  // funcion para hacer la peticion a la API por número

  const getDataDimension = (idDimension) => {
    setLoader(true)
    if (idDimension && idDimension > 0 && idDimension <= 126) {
      const URL = `https://rickandmortyapi.com/api/location/${idDimension}`
      axios.get(URL)
        .then((res) => {
          setTimeout(() => {
            setDimension(res.data)
            setLoader(false)
          }, 3000)
        })
        .catch((err) => {
          setshowError(true)
          console.log(err)
          console.log(err.response.data.error)
          console.log(err.response.data.status)
        })
    }
    else {
      setshowError(true)
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
    const URL = `https://rickandmortyapi.com/api/location?name=${event.target.searchValue.value}`
    axios.get(URL)
      .then((res) => {
        setnewUrl(res.data.results[0].url)
      })
      .catch((err) => {
        console.log(err)
        setshowError(true)
      })

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
          setshowError(true)
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


  const showSongCurrently = () => {
    if (currentlySong == 0) {
      setSongName("Evil Morty Song")
    }
    if (currentlySong == 1) {
      setSongName("Hombres lunares")
    }
    if (currentlySong == 2) {
      setSongName("Rick & Morty Intro")
    }
  }
  useEffect(() => {
    showSongCurrently()
  }, [currentlySong])

  const arrayMusic = [
    'for-the-damaged-coda-evil-morty-theme-song-from-rick-and-morty.mp3',
    'hombres-lunares-version-oficial-completo-feat-pedo-y-morty-rick-morty-adult-swim.mp3',
    'rick-y-morty-intro-en-espanol-hbo-max.mp3'
  ]

  const mySong = new Audio(arrayMusic[currentlySong])

  const handleNextPlay = (e) => {
    if (currentlySong < 2) {
      setCurrentlySong(currentlySong + 1)
    }
    else {
      setCurrentlySong(0)
    }
    mySong.pause()
    e.target.previousSibling.classList.add("media__hidden")
    e.target.previousSibling.previousSibling.classList.remove("media__hidden")
  }

  const handlePrevPlay = (e) => {
    if (currentlySong < 2 && currentlySong > 0) {
      setCurrentlySong(currentlySong - 1)
    }
    else {
      setCurrentlySong(2)
    }
    mySong.pause()
    e.target.nextSibling.classList.remove("media__hidden")
    e.target.nextSibling.nextSibling.classList.add("media__hidden")
  }


  const handleMediaPlay = (e) => {
    mySong.play()
    e.target.classList.add("media__hidden")
    e.target.nextSibling.classList.remove("media__hidden")
  }

  const handleMediaStop = (e) => {
    mySong.pause()
    e.target.classList.add("media__hidden")
    e.target.previousSibling.classList.remove("media__hidden")

  }



  return (
    <div className="App">
      {
        dimension ? (
          <>
            <div className='header__img'>
              <img src="https://i.postimg.cc/sgqJvw7w/image3.jpg" alt="Background image Rick & morty" />
            </div>
            <div className='media__container'>
              <div className='media__btn--container'>
                <i className='bx bx-skip-previous media__prev' onClick={handlePrevPlay} ></i>
                <i className='bx bx-play media__play' onClick={handleMediaPlay} ></i>
                <i className='bx bx-pause media__pause media__hidden' onClick={handleMediaStop} ></i>
                <i className='bx bx-skip-next media__next' onClick={handleNextPlay} ></i>
              </div>
              <p className='song__name' >{songName}</p>
            </div>
            <audio className='audio__tag' src={arrayMusic[currentlySong]} type="audio/mp3"></audio>
            <div className='form__container'>
              <form className='form__flex' onSubmit={handlesubmit} >
                <div className='filter__container'>
                  <input autoComplete='off' id='searchValue' type="text" value={locationName} onChange={handleChangeInput} placeholder='search your dimension' className='input__search' />
                  <LocationFilter locationName={locationName} getNewLocation={getNewLocation} />
                </div>
                <button className='btn__search' type='submit'>Search</button>
              </form>
            </div>

            <LocationInfo dimension={dimension} showError={showError} getDataDimension={getDataDimension} />

            <section className='cards__container'>
              {
                !showError ? loader ? <Loader /> : (dimension?.residents.length ? dimension?.residents.map(urlResident => <ResidentCard key={urlResident} urlResident={urlResident} />) : <NotPopulation />) : ""
              }
            </section>
          </>
        ) : <div className='flex__container'> <Loader /> </div>
      }

    </div>
  )
}

export default App