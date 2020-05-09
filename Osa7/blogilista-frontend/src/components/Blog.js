import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import blogService from '../services/blogService'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { Form, Button} from 'react-bootstrap'
    
const Blog = ({ blog }) => {   
const user = useSelector(state => state.user)
const users = useSelector(state => state.users)
const dispatch = useDispatch()
const history = useHistory()    
const [comment, setComment] = useState('')    

let userWhoAddedBlog = null
let usernameWhoAddedBlog = null    

    if(!blog) {
        dispatch(setNotification('blog has been deleted', 4, true))
        return null
    }    
    

    if (!blog.user.username) {
        userWhoAddedBlog = users.find(u => u.id === blog.user).name
        usernameWhoAddedBlog= users.find(u => u.id === blog.user).username        
    } else {
        userWhoAddedBlog = blog.user.name
        usernameWhoAddedBlog = blog.user.username        
    }
   
    const showRemoveButton = user && blog.user && user.username === usernameWhoAddedBlog
    
    const handleLike = () => {

        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        blogService
        .update(blog.id, updatedBlog)
        .then(returnedBlog => {
            dispatch(updateBlog(returnedBlog))
        })
        .catch(error => {
            dispatch(setNotification('could not update blog', 4, true))
        })
    }

    const handleRemoveBlog = (id) => {
        blogService
            .remove(id)
            .then(response => {
                if(response.status === 204) {
                    history.push('/')
                    dispatch(removeBlog(id))                    
                    dispatch(setNotification(`blog ${blog.title} by ${blog.author} removed`, 3))
                } else {
                    dispatch(setNotification(`Could not remove blog: ${response.statusText}`, 4, true))
                }
            })
            .catch(error => {
                dispatch(setNotification(`${error}`, 5, true))
            })
    }

    const handleRemove = () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {            
            handleRemoveBlog(blog.id)
        }
    }

    const removeButton = () => (
        <div>
            <Button style={{ marginTop: 20 }} onClick={handleRemove} variant='secondary'>Remove</Button>
        </div>
    )

    const userInfo = () => {
        return (
            <p>added by {userWhoAddedBlog}</p>
            
        )        
    }
    
    const handleComment = (event) => {
        event.preventDefault()
        if(comment) {
            blogService
                .addComment(blog.id, comment)
                .then(returnedBlog => {
                    dispatch(updateBlog(returnedBlog))
                    dispatch(setNotification('comment added'))
                    setComment('')
                })
                .catch(error => {
                    dispatch(setNotification('could not comment on blog', 4, true))
                })
        }
    }

    const blogComments = () => (
        <div>
            <ul>
                {blog.comments.map((comment, i) =>
                    <li key={i}>
                        <p>{comment}</p>
                    </li>
                )}
            </ul>
        </div>
    )

    return (
        <div>
            <h2>{blog.title} - {blog.author}</h2>
            <a href={blog.url}>{blog.url}</a>
            { blog.user && userInfo() }
            <p>{blog.likes} {blog.likes === 1 ? 'like' : 'likes'}</p>
            <Button onClick={handleLike} variant='secondary'>Like</Button>
        
            { showRemoveButton && removeButton() }
            <br />
                <h3>comments</h3>
                <Form onSubmit={handleComment}>
                <div>
                    <Form.Group>
            
                    <Form.Label>comment:</Form.Label>
                    <Form.Control               
                        type ="text"
                        id='comment' label='comment' value={comment} onChange={({ target }) => setComment(target.value)}
                    />
        
                    <br></br>
                    <Button id='comment-button' variant='primary'  type='submit'>ADD COMMENT</Button>
                    </Form.Group>
                    </div>
                </Form>      
                <div>
                    { blog.comments && blogComments() }
                </div>      
        </div>
       
    )
}


export default Blog