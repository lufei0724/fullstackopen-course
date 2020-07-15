import React from 'react'
import { connect } from 'react-redux'
import { increaseVoteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = (props) => {
  const { anecdote, handleClick } = props
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = (props) => {

  const vote = (anecdote) => {
    props.increaseVoteOf(anecdote)
    const notification = `you voted '${anecdote.content}'`
    props.setNotification(notification, 5000)
  }

  return (
    <div>
      {props.anecdotesToShow
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => vote(anecdote)}
          />
      )}
    </div>
  )
}

const anecdotesToShow = ({anecdotes, filter}) => {
  let re = new RegExp(filter, 'i')
  return anecdotes.filter((anecdote) => anecdote.content.match(re))
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  increaseVoteOf,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)
