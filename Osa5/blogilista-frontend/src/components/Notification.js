import React from 'react'

const Notification = ({ message, isError }) => {

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

    if(message === null) {
        return null
    }
    if(isError) {
        return (
            <div className='notification error' style={errorStyle}>
                {message}
            </div>
        )
    }
    return (
        <div className='notification message' style={successStyle}>
            {message}
        </div>
    )
}

export default Notification