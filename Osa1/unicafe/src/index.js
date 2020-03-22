import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
// <Display value={value} /> 



//const Display = props => <div>{props.value}</div>


const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const StatisticsLine = (props) => { 

  let pros = "" 

  if (props.text==="positive") {
    pros = " %"
  }  

  return (    
    <div>    
    <table>
    <tbody>
    <tr>
      <td col width="60"> {props.text} </td>
      <td> {props.value} </td>
      <td>  {pros} </td>
    </tr>    
    </tbody>
    </table>  
    </div>    
    )  
}

const Statistics = (props) => {
 
  const all = props.good + props.neutral + props.bad
  let average = 0 
  let positive = 0 

  if (all===0){
    return (
      <div>
        <br></br>
        <h1>statistics </h1>      
        No feedback given
      </div>
    )
  }

  average = (props.good - props.bad)/all
  positive = 100*props.good/all 
  
  return (
  <div>

  <h1>statistics </h1>       
  <StatisticsLine text="good" value={props.good} />        
  <StatisticsLine text="neutral" value={props.neutral} />          
  <StatisticsLine text="bad" value={props.bad} />            
  <StatisticsLine text="all" value={all} />            
  <StatisticsLine text="average" value={average} />            
  <StatisticsLine text="positive" value={positive} />                              
  
  </div>  

  )  
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)  

  
  const handleGoodClick = () => {        
    setGood(good + 1)
  }

  const handleNeutralClick = () => {    
    setNeutral(neutral + 1)    
  }

  const handleBadClick = () => {    
    setBad(bad + 1)    
  }

  return (
    <div>       
      <div>                
        <h1>give feedback </h1>

        <Button onClick={handleGoodClick} text='good' />        
        <Button onClick={handleNeutralClick} text='neutral' />        
        <Button onClick={handleBadClick} text='bad' />            
        <br></br>

        <Statistics good={good} neutral={neutral} bad={bad} />        
       </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

//ReactDOM.render(
//  <React.StrictMode>
//    <App />
//  </React.StrictMode>,
//  document.getElementById('root')
//);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
