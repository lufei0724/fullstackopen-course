import React from 'react';
import Curriculum from './component/Curriculum'

const App = () => {
  const courses = [
    {
      name:  'Half stack application development',
      parts: [
        {
          name: 'Fundamentals of React', 
          exercise: 10,
          id: 1
        },
        {
          name: 'Using props to pass data', 
          exercise: 7,
          id: 2
        },
        {
          name: 'State of a component', 
          exercise: 14,
          id: 3
        },
        {
          name: 'Redux', 
          exercise: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercise: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercise: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <Curriculum 
        name = 'Web development curriculum'
        courses={courses} />
    </div>
  )
}

export default App