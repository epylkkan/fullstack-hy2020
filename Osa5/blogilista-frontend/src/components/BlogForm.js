import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                     title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                        id='titleInput'
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <br></br>

                    author:&nbsp;
                    <input
                        id='authorInput'
                        value={author}
                        onChange={handleAuthorChange}
                    />
                    <br></br>

                    url:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input
                        id='urlInput'
                        value={url}
                        onChange={handleUrlChange}
                    />
                    <br></br>
                    <br></br>
                </div>
                <button id='createBlog' type='submit'>create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm