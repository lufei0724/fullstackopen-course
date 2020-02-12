import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Login from './components/Login'

const notes = [
  {
    id: 1,
    content: 'A real world web application',
    important: true
  },
  {
    id: 2,
    content: 'Scalable CSS for Large Projects',
    important: true
  },
  {
    id: 3,
    content: 'Contribute to Open Source Software',
    important: false
  },
]

const Home = () => (
  <div> 
    <h2>TKTL notes app</h2>
  </div>
)

const Notes = (props) => (
  <div>
    <h2>Notes</h2>
    <ul>
      {props.notes.map(note =>
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Note = ({ note }) => {
  console.log(note)
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Users = () => (
  <div>
    <h2>
      Users
    </h2>
  </div>  
)

const App = () => {
  const [user, setUser] = useState('')

  const padding = {
    padding: 5
  }

  const noteById = (id) => notes.find((note) => note.id === Number(id))

  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">Home</Link>
            <Link style={padding} to="/notes">Notes</Link>
            <Link style={padding} to="/users">Users</Link>
            {user
              ? <em>{user} logged in</em>
              : <Link style={padding} to="/login">Login</Link>
            }
          </div>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/notes" render={() => <Notes notes={notes}/>} />
          <Route exact path="/notes/:id" render={({ match } ) => 
            <Note note={noteById(match.params.id)} />
          } />
          <Route exact path="/users" render={() => 
            user ? <Users /> : <Redirect to="/login"/> }
          />
          <Route exact path="/login" render={() => <Login onLogin={setUser}/>} />
        </div>
      </Router>
      <div>
        <br />
        <em>Note app, Department of Computer Science</em>
      </div>
    </div>
  )
}

export default App