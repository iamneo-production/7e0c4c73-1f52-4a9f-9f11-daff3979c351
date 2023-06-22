import React from 'react';
import './App.css';
import axios from "axios"
import { useEffect, useState } from 'react';
import { MovieCard } from './components/MovieCard/MovieCard';

function App () {

    const [movies,setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');

    const getMovies = async () => {
      try{
        const { data } = await axios.get("api link");
        setMovies(data);
      }catch(err){
        console.log(err);
      }
    }

    useEffect(()=> {
      getMovies();
    },[])

    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setMovies(filteredMovies);
    }
    

  return (
    
        <div className="App">
          <header className='header'>
          <h1 className='heading'>MovieCard</h1>
          <div className="search-container">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
            <button onClick={handleSubmit} style={{ float: 'right' }}>Search</button>
          </div>
          </header>
          <main className='main'>
              {
                movies && movies.length > 0 && movies.map(movie => <MovieCard key={movie.id} movie={movie}/>)
              }
          </main>
        </div>
      
  );
};

export default App;
