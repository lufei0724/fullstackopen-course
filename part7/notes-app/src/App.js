import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Login from './components/Login'
import { Table, Alert, Navbar, Nav } from 'react-bootstrap'

const notes = [
  {
    id: 1,
    content: 'A real world web application',
    important: true,
    user: 'Kwahi Leonard'
  },
  {
    id: 2,
    content: 'Scalable CSS for Large Projects',
    important: true,
    user: 'Otis Know'
  },
  {
    id: 3,
    content: 'Contribute to Open Source Software',
    important: false,
    user: 'Maeve Wiley'
  },
]

const Home = () => (
  <div> 
    <h2>TKTL notes app</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
    </p>
  </div>
)

const Notes = (props) => (
  <div>
    <h2>Notes</h2>
    <Table striped bordered hover>
      <tbody>
        {props.notes.map(note =>
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </td>
            <td>
              {note.user}
            </td>
          </tr>
        )}
      </tbody>
    </Table>
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

const Menu = (props) => {

  const padding = {
    padding: 5
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as="span">
            <Link style={padding} to="/">Home</Link>
          </Nav.Link>
          <Nav.Link>
            <Link style={padding} to="/notes">Notes</Link>
          </Nav.Link>
          <Nav.Link>
            <Link style={padding} to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link>
            {props.user ? <em>{props.user} logged in</em>
              : <Link style={padding} to="/login">Login</Link>
            }
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const App = () => {
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')

  const noteById = (id) => notes.find((note) => note.id === Number(id))

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  return (
    <div className="container">
      <Router>
        <div>
          <div>
            {(message &&
              <Alert variant="success">
                {message}
              </Alert>
            )}
            <Menu user={user}/>
          </div>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/notes" render={() => <Notes notes={notes}/>} />
          <Route exact path="/notes/:id" render={({ match } ) => 
            <Note note={noteById(match.params.id)} />
          } />
          <Route exact path="/users" render={() => 
            user ? <Users /> : <Redirect to="/login"/> }
          />
          <Route exact path="/login" render={() => <Login onLogin={login}/>} />
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