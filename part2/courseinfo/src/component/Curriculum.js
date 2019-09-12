
import React from 'react';
import Course from './Course';

const Curriculum = ({name, courses}) => {
  return (
    <div>
      <h1>{name}</h1>
      {courses.map((course) => 
        <Course 
          key = {course.name}
          course = {course}
        />)}
    </div>
  )
}

export default Curriculum

