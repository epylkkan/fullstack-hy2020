import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const user = useSelector(state => state.user)

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
            url: url,
            user: user
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
        <h2>Create blog</h2>
        <Form onSubmit={addBlog}>
        <Form.Group>
            
        <Form.Label>title:</Form.Label>
            <Form.Control               
               type ="text"
               id='titleInput' label='title' value={title} onChange={handleTitleChange} 
            />


        <Form.Label>author:</Form.Label>
            <Form.Control
                type="text"
                id='authorInput' label='author' value={author} onChange={handleAuthorChange} />


            <Form.Label>URL:</Form.Label>
            <Form.Control
                type="text"
                id='urlInput' label='url' value={url} onChange={handleUrlChange} />

            <br></br>
            <Button id='createBlog' variant='primary'  type='submit'>CREATE</Button>
        </Form.Group>
            
        </Form>
        </div>

  
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm