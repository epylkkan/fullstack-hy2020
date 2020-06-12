import React from "react";
import ReactDOM from "react-dom";
import Content from './components/Content'; 
//import Part from './components/Content'; 
import Header from './components/Header'; 
import Total from './components/Total'; 


const App: React.FC = () => {
  
  const courseName = "Half Stack application development";

  interface CoursePartBase {
    name: string;    
    exerciseCount: number;    
  }
  
  interface CoursePartDescription extends CoursePartBase {
    description: string;
  }

  interface CoursePartOne extends CoursePartDescription {
    name: "Fundamentals";    
  }
  
  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
  interface CoursePartThree extends CoursePartDescription {
    name: "Deeper type usage";    
    exerciseSubmissionLink: string;
  }

  interface CoursePartFour extends CoursePartDescription {
    name: "Advanced topics";        
  }
  
  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree  | CoursePartFour;
  
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 11,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Advanced topics",
      exerciseCount: 20,
      description: "Fuzzy logic",      
    }
  ];
     
  const exercisesTotal = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  
  return (
    <div>
      <Header courseName={courseName} />
      <Content courses ={courseParts} />      
      <Total exercisesTotal={exercisesTotal} />
    </div>
  )

};

ReactDOM.render(<App />, document.getElementById("root"));
