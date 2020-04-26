import anecdoteService from '../services/anecdotes'


const reducer = (state = [], action) => {

    switch(action.type) {
        case 'UPDATE':
            const id = action.data.id
            return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
        case 'NEW_ANECDOTE':         
            return [...state, action.data]            
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

export const vote = (anecdote) => {


   const changedAnecdote = { 
    id: anecdote.id, 
    content: anecdote.content, 
    votes: anecdote.votes+1
   }

      return async dispatch => {        
        const updatedAnecdote = await anecdoteService.update(anecdote.id, changedAnecdote)
        dispatch({
            type: 'UPDATE',
            data: updatedAnecdote
        })      
      }
}

export const createAnecdote = (newContent) => {
    
    return async dispatch => {
    
        const newAnecdote = await anecdoteService.createNew(newContent)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }
}


export const initializeAnecdotes = () => {

  return async dispatch => {
     const anecdotes = await anecdoteService.getAll()
     dispatch({
        type: 'INIT_ANECDOTES',
        data: anecdotes
    })
}
}

export default reducer