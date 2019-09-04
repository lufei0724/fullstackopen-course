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
   const statistics = {...props.statistics};
   if (statistics.all() === 0) {
     return (
       <table>
         <tbody>
            <Statistic 
              text={'No feedback given'}
            />
         </tbody>
       </table>
     );
   } else {
     return (
       <table>
         <tbody>
            <Statistic text={'good'} value={statistics.good} />
            <Statistic text={'neutral'} value={statistics.neutral} />
            <Statistic text={'bad'} value={statistics.bad} />
            <Statistic text={'all'} value={statistics.all()} />
            <Statistic text={'average'} value={statistics.average()} />
            <Statistic text={'positive'} value={statistics.positive() + '%'} />
         </tbody>
       </table>
     );
   }
}

const Statistic = (props) => {
  const {text, value} = props;
  return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  );
}

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, 
    neutral: 0,
    bad: 0,
    all: function() {
      return this.good + this.neutral + this.bad;
    },
    average: function() {
      return (this.good * 1 + this.bad * -1) / this.all();
    },
    positive: function() {
      return this.good / this.all() * 100
    } 
  });

  const handleGoodClick =() => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1
    }
    setClicks(newClicks);
  }

  const handleNeutralClick =() => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1
    }
    setClicks(newClicks);
  }

  const handleBadClick =() => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1
    }
    setClicks(newClicks);
  }

  return (
    <div>
      <Title text={'give feedback'}/>
      <Button 
        onClick={handleGoodClick}
        text={'good'}
      />
      <Button 
        onClick={handleNeutralClick}
        text={'neutral'}
      />
      <Button 
        onClick={handleBadClick}
        text={'bad'}
      />
      <Title text={'statistics'} />
      <Statistics statistics={clicks} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
