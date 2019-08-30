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
  if (props.length === 0) {
    return (
      <StastRow
        text={'No feedback given'}
      />
    )
  } else {
    props.forEach((e) => 
      <StastRow
        text={e.text}
        value={e.value}
      />
    )
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

 // const [allClicks, setAll] = useState([]);

  const statistics = [{text: 'aaa', value: 0},
                       {text: 'bbb', value: 20}
                     ];

  const handleGoodClick = () => {
    const newClicks = {
      ...clicks,
      good: clicks.good + 1
    }
    setClicks(newClicks);
  };

  const handleNeutralClick = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1
    }
    setClicks(newClicks);
  };

  const handleBadClick = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1
    }
    setClicks(newClicks);
  };

  const all =() => clicks.good + clicks.neutral + clicks.bad;
  const average =() => 
    all() === 0 ? 0 : (clicks.good * 1 + clicks.bad * -1) / all();
  const positive =() =>
    all() === 0 ? 0 : clicks.good / all() * 100;

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
      <Statistics statistics={statistics} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
