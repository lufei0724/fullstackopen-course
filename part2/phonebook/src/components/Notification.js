import React from 'react'

const Notification =({message}) => {

  const notificationStyle = {
    backgroundColor: 'silver',
    color: 'green',
    border: 'solid',
    borderColor: 'green',
    borderRadius: 5,
    fontSize: 20,
    padding: 10,
    marginBottom: 10
  }

  if (message.content === null) {
    return null;
  }

  if (message.type === 'error') {
    notificationStyle.color = 'red';
  } else {
    notificationStyle.color = 'green';
  }

  return (
    <div style={notificationStyle}> 
      {message.content}
    </div>
  )
}

export default Notification