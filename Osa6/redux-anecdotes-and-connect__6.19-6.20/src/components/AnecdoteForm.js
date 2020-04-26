import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        event.preventDefault()      
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''        
            
        props.createAnecdote(content)
        props.setNotification(`you added a new anecdote '${content}'`, 5)
    }    

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
            <br />
        </div>
    )
}

export default connect (
    null,
    { createAnecdote, setNotification }
) (AnecdoteForm)