import React from 'react';

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map((course, i) => 
          <Course key={i} course={courses[i]} />
        )}      
    </div>
  )
}

const Course = ({ course }) => {

  let totalExercises  = course.parts.reduce((sum, e) => sum + e.exercises, 0)

  return (
    <div>
      <h2>{course.name}</h2>

      {course.parts.map((part, i) => 
          <Part key={i} part={course.parts[i]} />
        )}     
      

      <h3> total of {totalExercises} exercises</h3>              

    </div>
  )
}


const Part = ({ part }) => {
  return (
  <div> 
    <p>        
     {part.name} {part.exercises}                 
     </p>
   </div>
  )
}

export default Courses
