import React from 'react'

const AddNewContact =(props) => {
  const {
    handleFormSubmit,
    contact,
    setContact
  } = props

  const handleNameOnChange =(name) => {
    const newContact = {...contact, name: name };
    setContact(newContact);
  }

  const handlePhoneOnChange =(number) => {
    const newContact = {...contact, number: number};
    setContact(newContact);
  }

  return (
    <form onSubmit = {handleFormSubmit}>
      <div>
        name: <input 
          name='name' required 
          value={contact.name}
          onChange={(event)=> handleNameOnChange(event.target.value)}
        />
      </div>
      <div>
        number: <input 
          name="phone"
          value={contact.number}
          onChange={(event)=> handlePhoneOnChange(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddNewContact
