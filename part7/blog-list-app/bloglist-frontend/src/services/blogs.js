import axios from 'axios'
import configReq from './configReq'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios
    .get(baseUrl, configReq())
  return response.data
}

const getSingleBlog = async (id) => {
  const response = await axios
    .get(`${baseUrl}/${id}`, configReq())
  return response.data
}

const create = async (newObject) => {
  const response = await axios
    .post(baseUrl, newObject, configReq())
  return response.data
}

const update = async (newObject) => {
  const response = await axios
    .put(`${baseUrl}/${newObject.id}`, newObject, configReq())
  return response.data
}

const remove = async (id) => {
  await axios
    .delete(`${baseUrl}/${id}`, configReq())
}

const addComment = async (blogId, newObject) => {
  console.log(configReq())
  const response = await axios
    .post(`${baseUrl}/${blogId}/comments`, newObject, configReq())
  return response.data
}

export default { 
  getAll,
  getSingleBlog,
  create,
  update,
  remove,
  addComment,
}