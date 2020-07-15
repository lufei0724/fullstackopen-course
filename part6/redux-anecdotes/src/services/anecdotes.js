import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (content) => {
  const obj = { content, votes: 0 }
  const response = await axios.post(baseURL, obj)
  return response.data
}

const updateData = async (data) => {
  const response = await axios.put(`${baseURL}/${data.id}`, data)
  return response.data
}

export default {
  getAll,
  createNew,
  updateData,
}