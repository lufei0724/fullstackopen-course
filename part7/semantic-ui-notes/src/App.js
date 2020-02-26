import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Login from './components/Login'
import { Container, Table, Message, Menu } from 'semantic-ui-react'

const notes = [
  {
    id: 1,
    content: 'A real world web application',
    important: true,
    user: 'Kawahi Lenord'
  },
  {
    id: 2,
    content: 'Scalable CSS for Large Projects',
    important: true,
    user: 'Sheldon Cooper '
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
  </div>
)

const Notes = (props) => {

  const [sort, setSort] = useState({
    column: null,
    data: props.notes,
    direction: null,
  })

  const handleSort =(clickedColumn) => () => {
    if (sort.column !== clickedColumn) {
      setSort({
        column: clickedColumn,
        data: [...sort.data].sort(),
        direction: 'ascending'
      })
      return
    }

    setSort({
      data: [...sort.data].reverse(),
      direction: sort.direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  return (
    <div>
      <h2>Notes</h2>
      <Table celled sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={sort.column === 'content' ? sort.direction : null}
              onClick={handleSort('content')}
            >
              Content
            </Table.HeaderCell>
            <Table.HeaderCell>User</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sort.data.map(note => 
            <Table.Row key={note.id}>
              <Table.Cell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </Table.Cell>
              <Table.Cell>
                {note.user}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

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
  const [message, setMessage] = useState('')

  const padding = {
    padding: 5
  }

  const noteById = (id) => notes.find((note) => note.id === Number(id))

  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  return (
    <Container>
      {(message &&
        <Message success>
          {message}
        </Message>
      )}
      <Router>
        <div>
          <div>
            <Menu inverted>
              <Menu.Item link>
                <Link style={padding} to="/">Home</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link style={padding} to="/notes">Notes</Link>
              </Menu.Item>
              <Menu.Item link>
                <Link style={padding} to="/users">Users</Link>
              </Menu.Item>
              <Menu.Item link>
                {user
                  ? <em>{user} logged in</em>
                  : <Link style={padding} to="/login">Login</Link>
                }
              </Menu.Item>
            </Menu>
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
    </Container>
  )
}

export default App