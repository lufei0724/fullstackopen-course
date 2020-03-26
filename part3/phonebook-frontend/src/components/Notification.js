import React from 'react'

const Notification =({message}) => {

  const blankNofiStyle ={
    padding: 20,
    marginBottom: 23
  }

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

  if (message.type === 'error') {
    notificationStyle.color = 'red';
    notificationStyle.borderColor = 'red';
  } else {
    notificationStyle.color = 'green';
    notificationStyle.borderColor = 'green';
  }

  const style = message.content === null ? blankNofiStyle : notificationStyle;

  return (
    <div style={style}> 
      {message.content}
    </div>
  )
}

export default Notification