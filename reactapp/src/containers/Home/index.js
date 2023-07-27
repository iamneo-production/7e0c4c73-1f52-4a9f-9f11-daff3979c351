import React, { useState } from 'react';
import { NavBar } from '../../Components/Navbar';
import SearchBar from '../../Components/SearchBar/SearchBar'
import SearchResultsList from '../../Components/SearchResultsList/SearchResultsList'
import './home.css';

export const Home = (props) => {

  const [key, setKey] = useState('');
  const [results,setResults]= useState([]);


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
        {/* <form onSubmit={handleSearch} className='searchForm' >
          <input type='text' value={key} onChange={(e) => setKey(e.target.value)} required />
          <button type='submit' >Search</button>
        </form> */}
        <span className="searchForm">
                <SearchBar setResults={setResults}/>
                {results.length > 0 && <SearchResultsList results={results} />}
            </span>
      </div>
    </div>
  )

}