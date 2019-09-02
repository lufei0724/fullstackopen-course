import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './normalize.css';
import * as serviceWorker from './serviceWorker';

const Title = (props) => {
  const {text} = props;
  return (
    <h1>{text}</h1>
  );
}

const Button = (props) => {
  const {onClick, text} = props;
  return (
    <button onClick={onClick}>{text}</button>
  );
}

const Statistics = (props) => {
 // if (props.length === 0) {
   const statistics = [...props.statistics];
   if (statistics.length === 0 ||
     statistics.find(e => e.text === 'all').value === 0) {
     return (
       <StastRow 
         text={'No feedback given'}
       />
     );
   } else {
     return (
       statistics.map((e, index) => 
         <StastRow key={index}
           text={e.text}
           value={e.value}
         />
       )
     );
   }
}

const StastRow = (props) => {
  const {text, value} = props;
  return (
    <div>
      <p>{text} {value}</p>
    </div>
  );
}

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, 
    neutral: 0,
    bad: 0
  });

  const GOOD = 'good';
  const NEUTRAL = 'neutral';
  const BAD = 'bad';

  const initArr = [
                      {text: 'good', value: 0},
                      {text: 'neutral', value: 0},
                      {text: 'bad', value: 0},
                      {text: 'all', value: 0},
                      {text: 'average', value: 0},
                      {text: 'positive', value: 0},
                     ];

  const [stastList, setStast] = useState(initArr);

 // const [allClicks, setAll] = useState([]);

  const handleClick =(text) => () => {
    let goodClick = 0;
    let neutralClick = 0;
    let badClick = 0;
    if (text === 'good') {
      goodClick = 1;      
    }
    if (text === 'neutral') {
      neutralClick = 1;      
    }
    if (text === 'bad') {
      badClick = 1;      
    }
    const newClicks = {
      ...clicks,
      good: clicks.good + goodClick,
      neutral: clicks.neutral + neutralClick,
      bad: clicks.bad + badClick,
      all: function() {
        return this.good + this.neutral + this.bad;
      },
      average: function() {
        return (this.good * 1 + this.bad * -1) / this.all();
      },
      positive: function() {
        return this.good / this.all() * 100
      } 
    }

    setClicks(newClicks);

/*    setStast(stastList
      .map((e) => {
        if (e.text === 'good') {
          return {
            ...e,
            value: e.value + 1
          }
        } else {
          return e;
        }
      })
    );
  */
    setStast([
      {text: 'good', value: newClicks.good},
      {text: 'neutral', value: newClicks.neutral},
      {text: 'bad', value: newClicks.bad},
      {text: 'all', value: newClicks.all()},
      {text: 'average', value: newClicks.average()},
      {text: 'positive', value: newClicks.positive()},
    ])
  }

  return (
    <div>
      <Title text={'give feedback'}/>
      <Button 
        onClick={handleClick('good')}
        text={'good'}
      />
      <Button 
        onClick={handleClick('neutral')}
        text={'neutral'}
      />
      <Button 
        onClick={handleClick('bad')}
        text={'bad'}
      />
      <Title text={'statistics'} />
      <Statistics statistics={stastList} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
