import React, { useState } from 'react';
import axios from 'axios';
import { NavBar } from '../../Components/Navbar';
import "./cast.css";

export const CreateCast = (props) => {

  const [castName,setCastName] = useState('');
  const [poster,setPoster] = useState(null);
  const [message,setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('name',castName);
    formdata.append('poster',poster);
    axios.post(process.env.REACT_APP_BACKEND_URL + 'cast', formdata, {
      headers : {
        'Authorization' : `Bearer ${window.localStorage.getItem('token')}`
      }
    }).then((response) => {
      if(response.status == 200){
        setMessage("Cast created Successfully");
      }
      else{
        window.location.href = process.env.REACT_APP_FRONTEND_URL + 'signin';
      }
    }).catch((err)=>{
      setMessage("Could not create Cast");
    })
    
  }

  return (
    <div>
      <NavBar />
      <h2>Create Cast</h2>
      <form onSubmit={handleSubmit}>
        <label>Cast Name</label>
        <input type='text' placeholder='Enter Cast Name' required value={castName} onChange={(e)=>{setCastName(e.target.value)}}/>
        <label>Poster</label>
        <input type='file' placeholder='Cast Image' onChange={(e) => setPoster(e.target.files[0])} />
        <button type='submit'>Submit</button>
      </form>
      {
        message && <h3>{message}</h3>
      }
    </div>
  )
}