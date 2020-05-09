import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {   

    const blogs = useSelector(state => state.blogs)    
    const blogsToShow = blogs.sort((a, b) => b.likes - a.likes)

    return (
        <div>
        <br></br>
        <h2>Blogs</h2>
        <br></br>
        <Table striped>         
                <tbody>
                    {blogsToShow.map(blog =>
                        <tr key={blog.id}>
                            <td>
                                <Link to={`/blogs/${blog.id}`}>{blog.title} ({blog.author})</Link>
                            </td>
                        </tr>
                    )}             
                </tbody>
        </Table>

      </div> 

     )
 
}
   

export default BlogList