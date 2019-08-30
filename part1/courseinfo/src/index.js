import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
}

const Part = (props) => {
  return (
   <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
}

const Content = (props) => {
  return (
    <div>
      {props.content.map((content, index) => {
        return (
          <div key={index}>
            <Part 
              part = {content.part}
              exercise = {content.exercise}
            />
          </div>
        );
      })}
    </div>
  );
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises {props.total}
      </p>
    </div>
  );
}

const App = () => {
  const course = {
    name:  'Half stack application development',
    parts: [
      {
        name: 'Fundamentals of React', 
        exercise: 10
      },
      {
        name: 'Using props to pass data', 
        exercise: 7
      },
      {
        name: 'State of a component', 
        exercise: 14
      }
    ]
  }

  const total = ((a) => a.map((a) => a.exercise)
                         .reduce((a, b) => a + b))(course.parts);

  return (
    <div>
      <Header course={course.name}/>
      <Content content={course.parts}/>
      <Total total={total}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
