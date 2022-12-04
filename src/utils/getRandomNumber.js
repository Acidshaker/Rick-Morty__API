// conseguir una dimensión aleatoria del 1 al 126

const getRandomNumber = (number = 126) => {
  return Math.floor(Math.random() * number) + 1
}

export default getRandomNumber