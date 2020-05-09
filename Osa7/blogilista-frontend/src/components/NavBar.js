import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavBar = () => {
        
    const dispatch = useDispatch()    
    const user = useSelector(state => state.user)      
    const localStorageLoggedUser = 'loggedBlogAppUser'    

    const navmenu = {color: '#ffffff'};        
    const navnotselectable = {color: '#e51a1a'} 
        
    const handleLogout = () => {
        window.localStorage.removeItem(localStorageLoggedUser)
        dispatch(removeUser())
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">

            <Nav.Link href="#" as="span">
              <Link style={navmenu} to="/">BLOGS</Link>
            </Nav.Link>

            <Nav.Link href="#" as="span">
              <Link style={navmenu} to="/users">USERS</Link>
            </Nav.Link>

            <Nav.Link style={navnotselectable}  href="#" as="span">
              {user
                ? <em>{user.name} logged in</em>
                : <Link to="/login">login</Link>
              }
            </Nav.Link>

            <Nav.Link href="#" as="span">
               <Link style={navmenu} to="/login" onClick={handleLogout}>Logout</Link>
          </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )    
}

export default NavBar