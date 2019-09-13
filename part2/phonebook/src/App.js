import React, {useState} from 'react';

const Filter =({filterStr, setFilterStr}) => {
  return (
    <div>
      <label>
        filter shown with  
      </label>
      <input 
        value={filterStr}
        onChange={(event)=> setFilterStr(event.target.value)}
      />
    </div>
  )
}

const PersonForm =(props) => {
  const {
    handleFormSubmit,
    newName,
    setNewName,
    newPhone, 
    setNewPhone
  } = props

  return (
    <form onSubmit = {handleFormSubmit}>
      <div>
        name: <input 
          name='name' required 
          value={newName}
          onChange={(event)=> setNewName(event.target.value)}
        />
      </div>
      <div>
        number: <input 
          name="phone"
          value={newPhone}
          onChange={(event)=> setNewPhone(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons =({persons, filterStr}) => {
  const re = new RegExp(filterStr, 'i');
  return (
    persons.filter((person) => 
        person.name.match(re)
      )
      .map((person) => 
        <Person 
          key = {person.name}
          person = {person}
        />
      )
  )
}

const Person = ({person}) => {
  return (
    <p>
      {person.name} {person.phone}
    </p>
  )
}

const App =() => {

  const [person, setPersons] = useState([
    {name: 'Arto Hellas', phone: '040-1234567' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterStr, setFilterStr] = useState('')

  const handleFormSubmit =(event) => {
    event.preventDefault();
    if (person.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {'name': newName,
                         'phone': newPhone
                        };
      setPersons(person.concat(newPerson));
      setNewName('');
      setNewPhone('');
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filterStr={filterStr}
        setFilterStr={setFilterStr}
      />
      <h2>Add a new</h2>
      <PersonForm 
        handleFormSubmit={handleFormSubmit}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
      />
      <h2>Numbers</h2>
      <Persons 
        persons={person}
        filterStr={filterStr}
      />
    </div>
  )
}

export default App;
