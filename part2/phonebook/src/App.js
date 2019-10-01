import React, {useState, useEffect} from 'react';
import Filter from './components/Filter'
import AddNewContact from './components/AddNewContact'
import ContactList from './components/ContactList'
import contactService from './services/contacts'


const App =() => {

  const [contactList, setContactList] = useState([])
  
  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setContactList(initialContacts);
      });
  }, []);

  const initContact = {
    'name': '',
    'number': ''
  }
  const [contact, setContact] = useState(initContact)
  const [filterStr, setFilterStr] = useState('')

  const handleFormSubmit =(event) => {
    event.preventDefault();
    if (contactList.some((e) => e.name === contact.name)) {
      if (window.confirm(
        `${contact.name} is already added to the phonebook, ` +
        `replace the old number with a new one?`)) {
      const newContact = {...contact, 
        id:contactList.filter(e => e.name === contact.name)[0].id };
      contactService
        .updateContact(newContact)
        .then(returnedContact => {
          setContactList(contactList.map(e =>
            e.name === returnedContact.name ? returnedContact : e));
        });
    }} else {
      contactService
        .create(contact)
        .then(returnedContact => {
           setContactList(contactList.concat(returnedContact));
        });
    }
    setContact(initContact);
  }

  const handleDeleteContact =(contact) => {
    if (window.confirm(`Delete ${contact.name}`)) {
      contactService
        .deleteContact(contact)
        .then(setContactList(
          contactList.filter(e => e.id !== contact.id)));
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
      <AddNewContact
        handleFormSubmit={handleFormSubmit}
        contact={contact}
        setContact={setContact}
      />
      <h2>Numbers</h2>
      <ContactList 
        contactList={contactList}
        filterStr={filterStr}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  )
}

export default App;
