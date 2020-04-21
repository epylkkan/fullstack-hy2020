import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, updateBlog, removeBlog }) => {
    const [contentVisible, setContentVisible] = useState(false)
    const showWhenContentVisible = { display: contentVisible ? '' : 'none' }
    console.log(username)
    console.log(blog.user)
    //console.log(blog.user.username)
    const showRemoveButton = username && blog.user && username === blog.user.username

    const toggleVisibility = () => {
        setContentVisible(!contentVisible)
    }

    const handleLike = () => {
        const newBlog = { ...blog, likes: blog.likes + 1 }
        updateBlog(newBlog)
    }

    const handleRemove = () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            removeBlog(blog.id)
        }
    }

    const removeButton = () => (
        <button onClick={handleRemove}>remove</button>
    )

    const blogStyle = {
        borderStyle: 'solid',
        paddingTop: 10,
        paddingLeft: 2,
        paddingBottom: 10,
        borderWidth: 1,
        marginBottom: 5,
        borderRadius: 5,
        font: 40
    }

    return (
        <div style={blogStyle}>
            <div className='blogContentTopic'>
                <button className='button' onClick={toggleVisibility}>{contentVisible ? 'hide' : 'view'}</button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {blog.title} - {blog.author}
            </div>
            <div style={showWhenContentVisible} className='blogContentToView'>
                <div className='blogUrl'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {blog.url}
                </div>
                <div>
                    <button onClick={handleLike}>like</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; likes {blog.likes}
                </div>
                { showRemoveButton && removeButton() }
            </div>
        </div>
    )
}

Blog.propTypes = {
    updateBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
}

export default Blog