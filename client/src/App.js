import './App.css';
import React, {useEffect, useState} from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AddAuthor from './components/AddAuthor';
import Display from './components/Display';
import EditForm from './components/EditForm'; 


function App() {
    
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

    return (

        <div className="App">
            <h1>Favorite Authors</h1>
            <Routes>
                <Route path="/" element={<Display />}/>
                <Route path="/new" element={<AddAuthor />}/>
                <Route path="/edit/:id" element={<EditForm />}/>   
            </Routes> 
        </div>
        
  );
}

export default App;
