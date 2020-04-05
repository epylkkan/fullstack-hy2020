import React from 'react'

const Notification = ({ notification, type }) => {
    const successStyle = {
      color: 'green',
      borderStyle: 'solid',      
      font: 40,
      padding: 10,
      margin: 10
    }
  
    const errorStyle = {
      color: 'red',
      borderStyle: 'solid',
      borderRadius: 5,
      font: 40,
      padding: 10,
      margin: 10
    }

    if (notification === null) {
      return null
    } 
    
    if (type === 'error') {
      return (
        <div style={errorStyle}>
          {notification}
        </div>
      )
    } else {
      return (
        <div style={successStyle}>
          {notification}
        </div>
      )
    }
  }

  export default Notification