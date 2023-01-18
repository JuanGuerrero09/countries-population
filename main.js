const gameButton = document.getElementById("gameBtn");
const firstCountryImg = document.getElementById("firstCountryImg");
const secondCountryImg = document.getElementById("secondCountryImg");
const countryOneName = document.getElementById('countryOneName')
const countryTwoName = document.getElementById('countryTwoName')
const countryOneQuantity = document.getElementById('countryOneQuantity')
const questionText = document.querySelectorAll('.questionText')


const createGame = () => {
  let currentScore = 0
  let maxScore = 0
  let gameOver = false
  let currentQuestionText = 'population'

  let countryOne = []
  let countryTwo = []
  let countryThree = []

  const startGame = async () => {
    countryOne = await getARandomCountry()
    countryTwo = await getARandomCountry()
    countryThree = await getARandomCountry()
    console.log(countryOne, countryTwo);
    showCountries()
    console.log(currentQuestionText);
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
      countryOneQuantity.innerText = countryOne.population
      questionText.forEach(text => text.innerText = 'habitants') 
    }
    if (currentQuestionText == 'area'){
      countryOneQuantity.innerText = `${countryOne.area} m2`
      questionText.forEach(text => text.innerText = 'area') 
    }
    console.log(currentQuestionText);
  }

  const playRound = (choosedValue, secondValue) => {
    //Country one has x y
    if (choosedValue > secondValue) {

    }
  }

  const changeCountryTwo = () => {

  }

  return {
    startGame,
    changeFlags
  }
  
}


const game = createGame()

document.addEventListener('DOMContentLoaded', game.startGame)


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