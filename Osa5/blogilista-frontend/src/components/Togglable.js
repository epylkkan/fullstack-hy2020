import PropTypes from 'prop-types'
import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    Togglable.propTypes = {
        buttonLabel: PropTypes.string.isRequired
    }

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button className='togglableButton' onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable