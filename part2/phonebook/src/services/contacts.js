import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll =() => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create =(newContact) => {
  const request = axios.post(baseUrl, newContact);
  return request.then(response => response.data);
}

const updateContact =(contact) => {
  const request = axios.put(`${baseUrl}/${contact.id}`, contact);
  return request.then(response => response.data);
}

const deleteContact =(contact) => {
  const request = axios.delete(`${baseUrl}/${contact.id}`, {data: contact})
  return request.then(response => response.data);
}

export default {getAll, create, updateContact, deleteContact}