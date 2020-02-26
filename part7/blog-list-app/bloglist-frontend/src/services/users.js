import axios from 'axios'
import configReq from './configReq'

const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios
    .get(baseUrl, configReq() )
  return response.data
}

const getUserById = async (id) => {
  const response = await axios
    .get(`${baseUrl}/${id}`, configReq())
  return response.data
}

export default {
  getAll,
  getUserById,
}