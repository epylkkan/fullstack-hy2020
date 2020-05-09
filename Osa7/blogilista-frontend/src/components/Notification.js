import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if(notification === null) {
        return null
    }

    const errorCol = {color: '#e51a1a'} 
        
    if(notification.isError) {
        return (
        <div className="container">
           <Alert style={errorCol} variant="error"> {notification.message}</Alert>
        </div>
        )
    }
      
    return (
        <div className="container">
          <Alert variant="success">{notification.message}</Alert>
       </div>
    )
}


export default Notification