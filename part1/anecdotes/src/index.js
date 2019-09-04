import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

const Header = (props) => {
  const {text} = props;
  return (
    <h1>{text}</h1>
  );
}

const Button =(props) => {
  const {text, onClick} = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

const App = (props) => {
  const anecdotes = [...props.anecdotes]

  const getRandomNum =(max) => Math.floor(Math.random() * Math.floor(max));
  const maxNum = anecdotes.length - 1;
  const [selected, setSelected] = useState(
    {
      currSelected: 0,
      preSelected: 0
    });

  const [votes, setVote] = useState(Array(anecdotes.length).fill(0));
  const nextAnecdoteClick =() => {
    const newSelected = { ...selected }
    do {
      newSelected.currSelected = getRandomNum(maxNum);
    } while (newSelected.currSelected === newSelected.preSelected) 
    newSelected.preSelected = newSelected.currSelected; 

    setSelected(newSelected);
  }

  const handleVoteClick =(index) => () =>  {
    const copy = [...votes];
    copy[index] += 1;
    setVote(copy);
  }

  const getMaxNum =(arr) => 
     arr.indexOf(arr.reduce((a, b) => a > b ? a : b));  

  return (
    <div>
      <Header text={'Anecdote of the day'}/>
      <div>
        {anecdotes[selected.currSelected]}
      </div>
      <div>
        {`has ${votes[selected.currSelected]} votes`}
      </div>
      <Button 
        text={'vote'}
        onClick={handleVoteClick(selected.currSelected)}
      />
      <Button 
        text={'next anecdote'}
        onClick={nextAnecdoteClick}
      />
      <Header text={'Anecdote with most votes'}/>
      <div>
        {anecdotes[getMaxNum(votes)]}
      </div>
      <div>
        {`has ${votes[getMaxNum(votes)]} votes`}
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

