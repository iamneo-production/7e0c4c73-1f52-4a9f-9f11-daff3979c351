import React, { useState } from 'react'


export const Home = (props) => {

  const [key,setKey] = useState('');


  const handleSearch = (e) => {
    e.preventDefault();
    if(key && (key.trim() != '')){
      window.location.href =  process.env.REACT_APP_FRONTEND_URL+'search/'+key;
    }
  }


  return(
    <div>
      <form onSubmit={handleSearch} >
        <input type='text' value={key} onChange={(e)=>setKey(e.target.value)} required />
        <button type='submit' >Search</button> 
      </form>
    </div>
   )

 }