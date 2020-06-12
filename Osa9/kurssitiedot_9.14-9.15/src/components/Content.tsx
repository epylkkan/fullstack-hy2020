import React from 'react';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const assertNever = (value: any ): never => {  
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Part: React.FC < ({course: any}) > = ({ course })  => {
      
     switch (course.name) {
      case "Fundamentals":     
        return(
          <div>  {course.name} <br />{course.exerciseCount} <br /> {course.description} <br /><br /></div>
        )
                                   
      case "Using props to pass data":            
        return(
        <div>  {course.name} <br /> {course.exerciseCount} <br /> {course.groupProjectCount} <br /><br /> </div>
         )                                             
  
      case "Deeper type usage":                      
        return( 
          <div>  {course.name} <br />{course.exerciseCount} <br /> {course.description} <br /> {course.exerciseSubmissionLink} <br /> <br /></div>
        )
     
      case "Advanced topics":     
        return(
          <div>  {course.name} <br />{course.exerciseCount} <br /> {course.description}<br /> </div>
        )
      default: 
        return assertNever(course);          
    }
    
  }   

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Content: React.FC<{ courses: Array<any> }> = ({ courses }) => (
    
    <div>
        <div>
           {courses.map((course, i) => 
             <Part key={i} course={courses[i]} />                
           )}    
       </div>               
    </div>
  );


export default Content
