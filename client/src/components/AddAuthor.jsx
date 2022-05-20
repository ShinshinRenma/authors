import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom';

const AddAuthor = (props) => {

    const [fullname, setFullName] = useState("");
    const [authors, setAuthors] = useState([]);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const newAuthor = {
            fullname
        }
        axios.post("http://localhost:8000/api/authors", newAuthor)
            .then(res => {
                console.log(res.data);
                navigate("/");
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                const errorArr = [];
                console.log(err);
                for(const key of Object.keys(errorResponse)){
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
                console.log("Something went wrong: ", err)
            })
    }

  return (
    <div>
        <Link to="/">Home</Link>
        <h6>Add a new author:</h6>
        {errors.map((err, index) => <p key={index}>{err}</p>)}  
        <form onSubmit={ submitHandler }>
          
          <div>
            <label>Name: </label> 
            <input name="fullname" type="text" onChange={ (e) => setFullName(e.target.value) } value={fullname}/>
          </div>
          <div>
            <button><Link to="/">Cancel</Link></button>
            <button><input type="submit" value="Create" /></button>
          </div>
        </form>
        
    </div>
  )
}

export default AddAuthor