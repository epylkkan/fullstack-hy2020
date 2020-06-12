import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [createBook] = useMutation(CREATE_BOOK, {        
        refetchQueries: [{ query: ALL_AUTHORS }], 
        onError: (error) => {
            props.setError(error.graphQLErrors[0].message)            
        }, 
        update: (store, response) => {
            props.updateCacheWith(response.data.addBook)
        }    
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        
        const publishedYear = Number(published)

        createBook({ variables: {title, author, published: publishedYear, genres } })

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div style= {{marginTop: 20}}>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type='number'
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div style= {{marginTop: 20}}>
                    genres: {genres.join(' ')}
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">add genre</button>
                </div>

                <button style={{marginTop: 20}} type='submit'>create book</button>
            </form>
        </div>
    )
}

export default NewBook 