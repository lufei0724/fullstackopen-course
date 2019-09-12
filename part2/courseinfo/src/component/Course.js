import React from 'react';

const Course = ({course}) => {
  return (
    <div>
      <Header header = {course.name}/>
      <Content content = {course.parts}/>
      <Total exercises = {course.parts.map((part) => part.exercise)} />
    </div>
  )
}

const Header = ({header}) => {
  return (
    <div>
      <h2>{header}</h2>
    </div>
  );
}

const Content = ({content}) => {
  return content.map(part => 
    <Part 
      key = {part.id}
      part = {part}
    />)
}

const Part = ({part}) => {
  return (
   <div>
      <p>
        {part.name} {part.exercise}
      </p>
    </div>
  );
}

const Total = ({exercises}) => {
  return (
    <div>
      <p>
        Total of {exercises.reduce((a, b) => a + b)} exercises
      </p>
    </div>
  );
}

export default Course