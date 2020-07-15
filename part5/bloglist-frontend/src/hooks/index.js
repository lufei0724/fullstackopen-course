import { useState } from 'react'
import axios from 'axios'
import token from '../services/token'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = (init) => {
    !init ? setValue('') : setValue(init)
  }

  return {
    input: {
      type,
      value,
      onChange,
    },
    reset
  }
}

const useResource = (baseUrl) => {
  const [list, setList] = useState([])

  const getAll = () => {
    axios
      .get(baseUrl, { headers: { 'Authorization': token.getToken() } })
      .then(response => setList(response.data))
  }
  
  const create = (newObject) => {
    axios
      .post(baseUrl, newObject, { headers: { 'Authorization': token.getToken() } })
      .then(response => setList(list.concat(response.data)))
  }
  
  const update = (id, newObject) => {
    axios
      .put(`${baseUrl}/${id}`, newObject, { headers: { 'Authorization': token.getToken() } })
      .then(response => 
        setList(list
          .filter((e) => e.id !== response.data.id)
          .concat(response.data)))
  }
  
  const remove = (id) => {
    axios
      .delete(`${baseUrl}/${id}`, { headers: { 'Authorization': token.getToken() } })
      .then(() => 
        setList(list
          .filter((value) => value.id !== id)))
  }

  return [list,
    { getAll,
      create,
      update,
      remove
    }]
}
  
export { useField, useResource }
