const gameButton = document.getElementById("gameBtn");
const firstCountry = document.getElementById("firstCountry");
const secondCountry = document.getElementById("secondCountry");


const startGame = () => {
  let currentScore = 0
  let maxScore = 0
  let gameOver = false

  const countryOne = []
  const countryTwo = []

  const choseQuestion = () => {
    let randomValue = Math.round(Math.random())
    if (randomValue === 0){
      return 'area'
    }
    if (randomValue === 1){
      return 'population'
    }
  }

  const playRound = (choosedValue, secondValue) => {
    //Country one has x y
    if (choosedValue > secondValue) {

    }
  }

  const changeCountryTwo = () => {

  }
  
}


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

async function changeCountryTwo() {
  const newCountry = await getARandomCountry()
  console.log(newCountry);
  console.log(`${firstCountryObject.name}, has ${firstCountryObject.population} habitants
while ${newCountry.name} has ${newCountry.population} habitants`);
  firstCountry.src = `${firstCountryObject.flag}`;
  secondCountry.src = `${newCountry.flag}`;
}

const firstCountryObject = await getARandomCountry();

const secondCountryObject = await getARandomCountry();

console.log(`${firstCountryObject.name}, has ${firstCountryObject.population} habitants
while ${secondCountryObject.name} has ${secondCountryObject.population} habitants`)


gameButton.addEventListener('click', changeCountryTwo)