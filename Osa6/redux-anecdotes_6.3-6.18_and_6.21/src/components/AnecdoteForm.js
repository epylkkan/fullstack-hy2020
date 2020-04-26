import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()      
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''        
                              
        dispatch(createAnecdote(content))                     
        dispatch(setNotification(`you added a new anecdote '${content}'`, 5))        
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

export default AnecdoteForm

