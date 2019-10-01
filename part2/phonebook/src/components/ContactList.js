import React from 'react'

const ContactList =(props) => {
  const {contactList, filterStr, handleDeleteContact} = props;
  const re = new RegExp(filterStr, 'i');
  return (
    contactList.filter((contact) => 
        contact.name.match(re)
      )
      .map((contact) => 
        <Contact 
          key={contact.name}
          contact={contact}
          handleDeleteContact={handleDeleteContact}
        />
      )
  )
}

const Contact = ({contact, handleDeleteContact}) => {
  return (
    <div>
      <p>
        {contact.name} {contact.number}
        <button 
          onClick={() => handleDeleteContact(contact)}
        > delete
        </button>
      </p>
    </div>
  )
}

export default ContactList