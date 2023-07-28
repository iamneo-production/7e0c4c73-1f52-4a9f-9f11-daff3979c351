import React, { useState } from 'react';
import { NavBar } from '../../Components/Navbar';
import './home.css';
import { MovieList } from '../MovieList';

export const Home = (props) => {

  const [key, setKey] = useState('');


  const handleSearch = (e) => {
    e.preventDefault();
    if (key && (key.trim() != '')) {
      window.location.href = process.env.REACT_APP_FRONTEND_URL + 'search/' + key;
    }
  }


  return (
    <div className='home-body'>
      <NavBar removeSearchBar={true} />
      <div className='homeContainer'>
        <form onSubmit={handleSearch} className='searchForm' >
          <input type='text' value={key} onChange={(e) => setKey(e.target.value)} required />
          <button type='submit' >Search</button>
        </form>
      </div>
      <MovieList dontShowNavbar={true}/>
    </div>
  )

}