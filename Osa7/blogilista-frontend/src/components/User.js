import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = ({ user }) => {
   
  const blogs = useSelector(state => state.blogs)  

  if(!user) {
        return null
   }

   let blogsToShow = null   
   blogsToShow = blogs.filter(b =>  ((b.user.id === user.id) || (b.user === user.id)))
   
               
    return (
       <div>
        <h1>{user.name}'s blogs</h1>
        <br></br>
        <Table striped>
        <tbody>
          {blogsToShow.map(b =>
            <tr key={b.id}>
              <td>
                <Link to={`/blogs/${b.id}`}>
                  {b.title}
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      </div>
      
    )
}

export default User