async function getCountries(){
  const countriesPopulation = []
  const response = await fetch('https://restcountries.com/v3.1/all')
  const responseData = await response.json()
  await responseData.forEach(el => {
    const country = {
      name: el.name.official,
      population: el.population
    }
    countriesPopulation.push(country)
  })
  return countriesPopulation
}

const countries = await getCountries()
const numberOfCountries = countries.length - 1

function getARandomCountry(){
  const randomNumber = Math.ceil(Math.random()*numberOfCountries)
  return randomNumber
}

const {name:countryOne, population: populationOne} = countries[getARandomCountry()]
const {name:countryTwo, population: populationTwo} = countries[getARandomCountry()]


console.log(`${countryOne} has ${populationOne} habitants
while ${countryTwo} has ${populationTwo} habitants`)



