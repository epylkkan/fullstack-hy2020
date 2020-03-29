import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import Countries from './components/Countries'
import Country from './components/Country'
//import logo from './logo.svg';
//import './App.css';

//function App() {

const App = () => {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        //console.log(response.data)
        setCountries(response.data)         
      })
  }, [])

  const handleFilterChange = (event) => {    
    setFilter(event.target.value)
  }
 
  const countriesToShow = filter ===
   '' ? countries : countries.filter(country =>
     country.name.toLowerCase().includes(filter.toLowerCase()))      

 const handleCountryToShow = (country) => () => {
      setFilter(country)
  }


  return (
    <div>
      
      <FilterForm 
           filter={filter}
           handleFilterChange={handleFilterChange}  
      />
      <div>      
      <Countries countriesToShow={countriesToShow}  handleCountryToShow={handleCountryToShow}/>
      </div>
    </div>
  );
}

export default App;
