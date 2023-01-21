import numberSeparator from "number-separator";

const gameButton = document.getElementById("gameBtn");
const firstCountryImg = document.getElementById("firstCountryImg");
const secondCountryImg = document.getElementById("secondCountryImg");
const countryOneName = document.getElementById('countryOneName')
const countryTwoName = document.getElementById('countryTwoName')
const countryOneValue = document.getElementById('countryOneValue')
const questionText = document.querySelectorAll('.questionText')
const moreBtn = document.getElementById('moreBtn')
const lessBtn = document.getElementById('lessBtn')
const currentScoreText = document.getElementById('currentScoreText')
const currentScoreValue = document.getElementById('currentScoreValue')
const currentScoreContainer = document.getElementById('currentScoreContainer')


const createGame = () => {
  let currentScore = 0
  let maxScore = 0
  let gameOver = false
  let currentQuestionText = 'population'

  let countryOne = []
  let countryTwo = []
  let countryThree = []

  let countryOneQuantity
  let countryTwoQuantity

  const getCountries = async () => {
    countryOne = await getARandomCountry()
    countryTwo = await getARandomCountry()
    countryThree = await getARandomCountry()
    showCountries()
  }

  const showCountries = () => {
    firstCountryImg.src = `${countryOne.flag}`;
    secondCountryImg.src = `${countryTwo.flag}`
    countryOneName.innerText = countryOne.name
    countryTwoName.innerText = countryTwo.name
    choseQuestion()
  }

  const changeFlags = async () => {
    countryOne = countryTwo
    countryTwo = countryThree
    showCountries()
    countryThree = await getARandomCountry()
  }

  const choseQuestion = () => {
    const possibleQuestionTexts = ['area', 'population']
    let questionTextIndex = Math.round(Math.random() * (possibleQuestionTexts.length - 1))
    currentQuestionText = possibleQuestionTexts[questionTextIndex]

    if (currentQuestionText == 'population'){
      countryOneValue.innerText = numberSeparator(countryOne.population)
      questionText.forEach(text => text.innerText = 'habitants') 
    }
    if (currentQuestionText == 'area'){
      countryOneValue.innerText = `${countryOne.area} km2`
      questionText.forEach(text => text.innerText = 'territory') 
    }
  }

  const playRound = (e) => {
    //Country one has x y
    const answer = e.target.innerText
    let isCorrect

    if(currentQuestionText == 'population'){
      countryOneQuantity = countryOne.population
      countryTwoQuantity = countryTwo.population
    }
    if(currentQuestionText == 'area'){
      countryOneQuantity = countryOne.area
      countryTwoQuantity = countryTwo.area
    }
    if(answer == 'More'){
      isCorrect = countryTwoQuantity > countryOneQuantity
    }
    if(answer == 'Less'){
      isCorrect = countryTwoQuantity < countryOneQuantity
    }
    
    if (isCorrect){
      changeFlags()
      changeScore()
    }
    if (!isCorrect){
      gameOver = true
      currentScoreText.innerText = 'Game Over, Final Score: '
      currentScoreContainer.style.color = 'red'
    }
    // if (selectedOption > secondValue) {

    // }
  }

  const changeScore = () => {
    currentScore++
    currentScoreValue.innerText = currentScore
  }


  return {
    getCountries,
    changeFlags,
    playRound
  }
  
}


const game = createGame()

document.addEventListener('DOMContentLoaded', game.getCountries)
moreBtn.addEventListener('click', game.playRound)
lessBtn.addEventListener('click', game.playRound)


async function fetchCountries() {
  const countriesPopulation = [];
  const response = await fetch("https://restcountries.com/v3.1/all");
  const responseData = await response.json();
  await responseData.forEach((el) => {
    const country = {
      name: el.name.common,
      population: el.population,
      area: el.area,
      flag: el.flags['svg'],
      alpha3Code: el.cca3,
    };
    countriesPopulation.push(country);
  });
  return countriesPopulation;
}



async function getARandomCountry() {
  const countries = await fetchCountries();
  const numberOfCountries = countries.length - 1;
  const randomNumber = Math.ceil(Math.random() * numberOfCountries);
  return countries[randomNumber];
}




gameButton.addEventListener('click', game.changeFlags)