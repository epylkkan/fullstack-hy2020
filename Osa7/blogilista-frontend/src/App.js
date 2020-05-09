import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogService'
import loginService from './services/loginService'
import userService from './services/userService'

import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import { initUsers } from './reducers/usersReducer'
import BlogList from './components/BlogList'
import User from './components/User'
import Users from './components/Users'
import NavBar from './components/NavBar'
import {
    Switch,
    Route,    
    useRouteMatch
} from 'react-router-dom'


const App = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')    

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    const matchUserRoute = useRouteMatch('/users/:id')
    const matchedUser = matchUserRoute
    ? users.find(u => u.id === matchUserRoute.params.id)
    : null

    const matchBlogRoute = useRouteMatch('/blogs/:id')
    let matchedBlog = matchBlogRoute
    ? blogs.find(b => b.id === matchBlogRoute.params.id)
    : null


    const localStorageLoggedUser = 'loggedBlogAppUser'
    const blogFormRef = React.createRef()
    const loginFormRef = React.createRef()

    useEffect(() => {
    blogService.getAll().then(blogs =>
        dispatch(initBlogs(blogs))
     )
    }, [dispatch])

    useEffect(() => {
    userService.getAll().then(users => {
        dispatch(initUsers(users))        
    })
    }, [dispatch])

    useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(localStorageLoggedUser)    
    if(loggedUserJSON) {
        const loggedUser = JSON.parse(loggedUserJSON)
        dispatch(setUser(loggedUser))
        blogService.setToken(loggedUser.token)        
    }
    }, [dispatch])

    const addBlog = (b) => {
        blogFormRef.current.toggleVisibility()
        blogService
        .create(b)
        .then(returnedBlog => {
        dispatch(createBlog(returnedBlog))
        dispatch(setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 3, false))
        })
        .catch(() => {
            dispatch(setNotification('could not create blog', 4, true))
        })
        matchedBlog = b        
    }
            
    const handleLogin = async (e) => {
        e.preventDefault()         
  
        try {
            const user = await loginService.login({
                username, password
            })                 
            window.localStorage.setItem(localStorageLoggedUser, JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch(setUser(user))
            dispatch(setNotification(`User ${user.username} logged in`, 4, false ))            
            setUsername('')
            setPassword('')
        } catch(exception) {            
            dispatch(setNotification('Wrong username or password', 4, true))
        }                
    }


   const loginForm = () => (        
    <Togglable buttonLabel='login' ref={loginFormRef}>
               <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}                         
                handleSubmit = {handleLogin}
                />
    </Togglable>
   )

    const blogForm = () => (

        <Togglable buttonLabel='create new blog' ref={blogFormRef}>            
            <BlogForm createBlog={addBlog}/>
        </Togglable>
    )


    return (        
        <div className="container">
        {user === null ?
            <div>
                <Notification />
                {loginForm()}
            </div> :
            <div>
                <NavBar />
                <Notification />
                <Switch>
                    <Route path='/blogs/:id'>
                        <Blog blog={matchedBlog} />
                    </Route>
                    <Route path='/users/:id'>
                        <User user={matchedUser}/>
                    </Route>
                    <Route path='/users'>
                        <Users />
                    </Route>
                    <Route path='/'>
                        {blogForm()}
                        <BlogList />
                    </Route>
                </Switch>
            </div>
        }
        </div>        
    )
}

export default App
