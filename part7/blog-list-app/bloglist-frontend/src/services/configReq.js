import token from './token'

const configReq = () => {
  const authorization = token.getToken()
  return {
    headers: 
      { 'Authorization': authorization }
  }
}

export default configReq