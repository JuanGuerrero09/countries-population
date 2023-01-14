async function getCountries(){
  const countriesPopulation = []
  const response = await fetch('https://restcountries.com/v3.1/all')
  const responseData = await response.json()
  await responseData.forEach(el => {
    const country = {
      name: el.name.common,
      population: el.population,
      alpha3Code: el.cca3
    }
    countriesPopulation.push(country)
  })
  return countriesPopulation
}

async function getFlags(codeOne, codeTwo){
  const firstCountry = document.getElementById('firstCountry')
  const secondCountry = document.getElementById('secondCountry')
  console.log(firstCountry, secondCountry);
  const responseOne = await fetch(`https://countryflagsapi.com/svg/${codeOne}`)
  const responseTwo = await fetch(`https://countryflagsapi.com/svg/${codeTwo}`)
  firstCountry.src = `${responseOne.url}`;
  secondCountry.src = `${responseTwo.url}`;
  
}

const countries = await getCountries()
const numberOfCountries = countries.length - 1

function getARandomCountry(){
  const randomNumber = Math.ceil(Math.random()*numberOfCountries)
  return randomNumber
}

const {name:countryOne, population: populationOne, alpha3Code: countryCodeOne} = countries[getARandomCountry()]
const {name:countryTwo, population: populationTwo, alpha3Code: countryCodeTwo} = countries[getARandomCountry()]


console.log(`${countryOne}, ${countryCodeOne} has ${populationOne} habitants
while ${countryTwo}, ${countryCodeTwo} has ${populationTwo} habitants`)

getFlags(countryCodeOne, countryCodeTwo)



