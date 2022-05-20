import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom';
const Display = (props) => {

    const navigate = useNavigate();
    const [authors, setAuthors] = useState([])
    useEffect( () =>{
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                setAuthors(res.data);
            })
            .catch(err => {
                console.log("Something went wrong with axios call:", err)
            })
    }, [])

    const navigatetoEditForm = (authorId) => {
        navigate(`/edit/${authorId}`)
    }

    const deleteAuthor = (authorId) =>{
        axios.delete(`http://localhost:8000/api/authors/${authorId}`)
            .then(response => {
                console.log(response.data);
                setAuthors(authors.filter(author => author._id !== authorId));
            }).catch(err => {
                console.log(err);
            })
        
    }
    
  return (
    <div>
        <Link to="/new">Add an author</Link>
        <table>
            <tr>
                <th>Author</th>
                <th>Actions Available</th>
            </tr>
            {
                authors.map((author, idx) =>{
                    return (
                        <tr key={idx}>
                            <td><Link to={`/${author._id}`} key={author._id}>{author.fullname}</Link></td>
                            <td><button onClick={(e) => navigatetoEditForm(author._id)}>Edit</button><button onClick={(e) => deleteAuthor(author._id)}>Delete</button></td>
                        </tr>
                    )
                })
            }  
        </table>
    </div>
  )
}

export default Display
