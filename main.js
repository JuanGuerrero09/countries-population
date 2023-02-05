import numberSeparator from "number-separator";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB09h45wFutyzssyMzHwdLdhUo1ZSpAVQ",
  authDomain: "countries-game-fcc4f.firebaseapp.com",
  projectId: "countries-game-fcc4f",
  storageBucket: "countries-game-fcc4f.appspot.com",
  messagingSenderId: "448314381112",
  appId: "1:448314381112:web:c2175b7aa2c404c20667cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const restartBtn = document.getElementById("restartBtn");
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
const maxScoreValue = document.getElementById('maxScoreValue')
const currentScoreContainer = document.getElementById('currentScoreContainer')


const changeVisibilityRestartBtn = () => {
  restartBtn.style.display = (restartBtn.style.display == 'none')?'block':'none'
}


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
    moreBtn.addEventListener('click', game.playRound)
    lessBtn.addEventListener('click', game.playRound)
    const start = Date.now();
    countryOne = await getARandomCountry()
    countryTwo = await getARandomCountry()
    countryThree = await getARandomCountry()
    showCountries()
    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);
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
      isCorrect = countryTwoQuantity >= countryOneQuantity
    }
    if(answer == 'Less'){
      isCorrect = countryTwoQuantity <= countryOneQuantity
    }
    
    if (isCorrect){
      changeFlags()
      changeScore()
    }
    if (!isCorrect){
      gameOver = true
      maxScore = currentScore>maxScore? currentScore: maxScore
      moreBtn.addEventListener('click', game.playRound)
      lessBtn.removeEventListener('click', game.playRound)
      currentScoreText.innerText = 'Game Over, Final Score: '
      currentScoreContainer.style.color = 'red'
      changeVisibilityRestartBtn()
    }
  }

  const changeScore = () => {
    currentScore++
    currentScoreValue.innerText = currentScore
  }

  const restartGame = () => {
    maxScoreValue.innerText = maxScore
    currentScore = 0
    currentScoreValue.innerText = currentScore
    currentScoreText.innerText = 'Current score: '
    currentScoreContainer.style.color = 'blue'
    getCountries()
    changeVisibilityRestartBtn()
  }


  return {
    getCountries,
    restartGame,
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




restartBtn.addEventListener('click', game.restartGame)

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
//step seven