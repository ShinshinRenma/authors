import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useParams, useNavigate} from 'react-router-dom';
const EditForm = (props) => {

    const [fullname, setFullName] = useState("");
    const {id} = useParams();
    const [author, setAuthor] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    useEffect( () =>{
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(res => {
                setFullName(res.data.author.fullname);
                setAuthor(res.data.author);
                console.log(res.data.author)
            })
            .catch(err => {
                console.log("Something went wrong with axios call:", err)
            })
    }, [])

    const submitHandler = (e) => {
        e.preventDefault();
        const updatedAuthor = {
            fullname
        }
        axios.put(`http://localhost:8000/api/authors/${id}`, updatedAuthor, )
            .then(res => {
                console.log(res.data);
                navigate("/");
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                for(const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
                console.log("Something went wrong: ", err)
            })
    }

  return (
    <div>
        <h1>Favorite Authors</h1>
        <h6>Edit this author</h6>
        {errors.map((err, index) => <p key={index}>{err}</p>)}  
        <form onSubmit={ submitHandler }>
          <div>
            <label>Name: </label> 
            <input name="fullname" type="text" onChange={ (e) => setFullName(e.target.value) } value={fullname}/>
          </div>
          <div>
            <button><Link to="/">Cancel</Link></button>
            <button><input type="submit" value="Submit" /></button>
          </div>
        </form>
    </div>
  )
}

export default EditForm