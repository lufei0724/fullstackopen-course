
const initState = {
  type: '',
  text: '',
}

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return {...action.data}
    case 'CLEAR_MESSAGE':
      return initState
    default:
      return state
  }
}

export const setNotification = (message) => {
  return (dispatch) => {
    window.setTimeout(() => dispatch(clearNotification()), 5000)
    dispatch({
      type: 'SHOW_MESSAGE',
      data: {...message}
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export default notificationReducer