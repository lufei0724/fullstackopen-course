
const notificationReducer = (state='', action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (notification, displayTime) => {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: notification
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, displayTime)
  }
}

export default notificationReducer