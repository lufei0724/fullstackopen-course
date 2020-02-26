import usersService from '../services/users'

const usersReducer = (state=[], action) => {
  switch (action.type) {
    case 'ALL_USERS':
      console.log('Users reducers')
      console.log(action.data)
      return action.data
    case 'SINGLE_USER':
      return [action.data]
    default:
      return state
  }
}

export const showAllUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch({
      type: 'ALL_USERS',
      data: users
    })
  }
}

export const showSingleUser = (user) => {
  return async (dispatch) => {
    const returnUser = await usersService.getUserById(user.id)
    dispatch ({
      type: 'SINGLE_USER',
      data: returnUser
    })
  }
}

export default usersReducer