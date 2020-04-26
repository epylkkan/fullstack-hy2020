import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    
    const newId = Number((Math.random() * 1000000).toFixed(0))
    const newAnecdote = {id: newId, content: content, votes: 0 }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const update = async (id, anecdote) => {
    const response = await axios.put(`${baseUrl}/${id}`, anecdote)
    return response.data
}

export default { getAll, createNew, update }