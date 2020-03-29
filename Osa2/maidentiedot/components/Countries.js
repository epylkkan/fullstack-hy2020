import React from 'react'
import Country from './Country'

const OneCountry = ({country, handleOneCountryToShow}) => (
  <div>
      {country.name}
      <button onClick={handleOneCountryToShow}>show</button>
  </div>
)

const Countries = ({ countriesToShow, handleCountryToShow }) => {

  const numberOfCountries = countriesToShow.length
  //console.log(numberOfCountries)
  //console.log(countriesToShow)

  if (numberOfCountries > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
   } else if(numberOfCountries === 0) {
      return (
        <div> No match</div>
      )
  } else if (numberOfCountries === 1){
      return (
      <div>                                     
      {countriesToShow.map((country, i) =>   
             <Country key = {i} country={country} numberOfCountries={numberOfCountries}
              handleCountryToShow={handleCountryToShow(country.name)}/>        
           )}
       </div>
      )
  } else {
    return (                                        
    <div>
      {countriesToShow.map((country,i) =>
        <OneCountry key={i} country={country} 
        handleOneCountryToShow={handleCountryToShow(country.name)} />
      )}
    </div>     
    )
  }
 
  return (
    <></>
  )
}

export default Countries