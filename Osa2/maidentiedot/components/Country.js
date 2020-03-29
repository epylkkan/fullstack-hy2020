import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {

  const[ current, setCurrent ] = useState({})

  const key = process.env.REACT_APP_API_KEY
  const query = `http://api.weatherstack.com/current?access_key=${key}&query=${capital}`
  
  useEffect(() => {
      axios
          .get(query)
          .then(response => {            
            setCurrent(response.data.current)          
          })
  }, [])

  console.log(current.temperature)

  if(!current.temperature) {
      return (<div></div>)
  }
  
  return (
      <div>
          <h3>Weather in {capital}</h3>
          <div>
              <b>temperature:</b> {current.temperature} Celcius
          </div>
          <div>
              <img src={current.weather_icons[0]} style={{height: 50}} alt="current weather" />
          </div>
          <div>
              <b>wind:</b> {current.wind_speed} m/s direction {current.wind_dir}
          </div>
      </div>
  )}
 
const Country = ({ country, numberOfCountries, handleCountryToShow }) => {
  
const Language = ({language}) => (
    <li>{language}</li>
)

if (numberOfCountries===1) {
   return (
    <div>                    
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>Spoken languages</h3>
            <ul>
                {country.languages.map((language, i) =>
                    <Language key={i} language={language.name} />
                )}
            </ul>
            <img src={country.flag} style={{height: 50}} alt="no flag" />
            <Weather capital={country.capital} />
        
    </div>
  )}
  return (
    <div></div>
    )
}

export default Country