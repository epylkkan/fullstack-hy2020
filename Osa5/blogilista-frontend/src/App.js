import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogService'
import loginService from './services/loginService'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const [isError, setIsError] = useState(false)

    const localStorageLoggedUser = 'loggedBlogAppUser'
    const blogFormRef = React.createRef()
    const loginFormRef = React.createRef()
    const blogsToShow = blogs.sort((a, b) => b.likes - a.likes)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(localStorageLoggedUser)
        if(loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            setUser(loggedUser)
            blogService.setToken(loggedUser.token)
        }
    }, [])

    const addBlog = (b) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(b)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setIsError(false)
                showNotification(`a new blog "${returnedBlog.title}" by "${returnedBlog.author}" added`)
            })
            .catch(() => {
                setIsError(true)
                showNotification('could not create blog')
            })
    }

    const updateBlog = (b) => {
        const updatedBlog = {
            title: b.title,
            author: b.author,
            url: b.url,
            likes: b.likes,
            user: b.user
        }
        blogService
            .update(b.id, updatedBlog)
            .then(returnedBlog => {
                setBlogs(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog))
            })
            .catch(() => {
                setIsError(true)
                showNotification('could not update blog')
            })
    }

    const removeBlog = (id) => {
        blogService
            .remove(id)
            .then(response => {
                if(response.status === 204) {
                    showNotification('blog removed')
                    setBlogs(blogs.filter(blog => blog.id !== id))
                } else {
                    setIsError(true)
                    showNotification(`could not remove blog: ${response.statusText}`)
                }
            })
            .catch(error => {
                console.log(error)
                setIsError(true)
                showNotification(`${error}`)
            })
    }

    const showNotification = (m) => {
        setNotification(m)
        setTimeout(() => {
            setNotification(null)
            if(isError) {
                setIsError(false)
            }
        }, 4000)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(localStorageLoggedUser, JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch(exception) {
            setIsError(true)
            showNotification('wrong username or password')
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem(localStorageLoggedUser)
        setUser(null)
    }

    const loginForm = () => (
        <Togglable buttonLabel='login' ref={loginFormRef}>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />
        </Togglable>
    )

    const blogForm = () => (

        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
        </Togglable>
    )


    return (
        <div>
            <Notification message={notification} isError={isError}/>
            <h2>blogs</h2>
            <br/>
            {user === null ?
                loginForm() :
                <div>
                    {user.name} logged in &nbsp;&nbsp;
                    <button className='logout' onClick={handleLogout}>logout</button>
                    <br />
                    <br />
                    <br />
                    {blogForm()}
                    <br />
                    {blogsToShow.map(blog =>
                        <Blog key={blog.id} blog={blog} username={user ? user.username : null} updateBlog={updateBlog} removeBlog={removeBlog} />
                    )}
                </div>
            }
        </div>
    )
}

export default App
