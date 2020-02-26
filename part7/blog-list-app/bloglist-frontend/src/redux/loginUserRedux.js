
const loginUserReducer = (state = '', action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return ''
    default:
      return state
  }
}

export const setLoginUser = (user) => {
  return {
    type: 'LOGIN',
    data: user
  }
}

export const setLogout = () => {
  return {
    type: 'LOGOUT'
  }
}

export default loginUserReducer