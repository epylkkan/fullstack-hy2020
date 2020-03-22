import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const Header = (props) => {
    return (
     <div>
        <h1>
          {props.course} 
        </h1>
     </div>
    )
 }
 

const Content = (props) => {
    return (
        <div>        
        <Part1 part1={props.part1} excercises1 = {props.excercises1} />
        <Part2 part2={props.part2} excercises2 = {props.excercises2} />
        <Part3 part3={props.part3} excercises3 = {props.excercises3} />        
        </div> 
    )
 }
 
 const Part1 = (props) => {
    return (
         <p>
          {props.part1} {props.excercises1}  
        </p>
    )
 }

 const Part2 = (props) => {
    return (
         <p>
          {props.part2} {props.excercises2}  
        </p>
    )
 }

 const Part3 = (props) => {
    return (
         <p>
          {props.part3} {props.excercises3}  
        </p>
    )
 }


 const Total = (props) => {
    return (
        <div>        
        <p>Number of exercises {props.total}</p>                          
     </div>
    )
 }
 
const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14    
  
    return (
      <div>        
        <Header  course={course}  />           
        <Content part1={part1} excercises1={exercises1} part2={part2} excercises2={exercises2}part3={part3}excercises3={exercises3} />       
        <Total   total= {exercises1 + exercises2 + exercises3}/>        
        
      </div>
    )
  }
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
