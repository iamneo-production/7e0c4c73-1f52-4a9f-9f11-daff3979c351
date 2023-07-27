import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MovieCard } from '../../Components/MovieCard';
import { useParams } from 'react-router-dom';
import './Moviels.css';
import { NavBar } from '../../Components/Navbar';


const url = process.env.REACT_APP_BACKEND_URL+'search/movie/'

export const MovieList = (props) => {

  var { key } = useParams();

const [movies,setMovies] = useState([]);
const [searchTerm,setSearchTerm] = useState('');
const [found,setFound] = useState(true);

    const getMovies = async () => {
      try{
        const { data } = await axios.get(url+key);
        setMovies(data);
        if(data.length ==0){
          setFound(false);
        }
      }catch(err){
        setFound(false);
        console.log(err);
      }
    }

    useEffect(()=> {
        getMovies();
      },[]);
  
      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
      }
  
      const handleSubmit = (e) => {
        e.preventDefault();
        const filteredMovies = movies.filter(movie => movie.name.toLowerCase().includes(searchTerm.toLowerCase()));
        if (filteredMovies.length > 0) { 
          setMovies(filteredMovies);
          setFound(true);
        } else { 
          setFound(false);
          setMovies([]);
        }
      }


  return(

        <div className="app">
          {/* <header className='header'> */}
          {/* <h1 className='heading'>Movie Reviews</h1>
          <div className="search-container">
            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
            <button onClick={handleSubmit} style={{ float: 'right' }}>Search</button>
          </div> */}
          <NavBar/>
          {/* </header> */}


        <main className='main'>
              {
                found ? //ternary operator to conditionally render the movie cards or the not found message
                (movies && movies.length > 0 && movies.map((movie,i) => <MovieCard key={i} movie={movie}/>))
                :
                (<div className="not-found"> 
                  <h2>Did not find any movie you searched</h2>
                  <img src="https://cdn.iconscout.com/icon/free/png-256/no-data-1-458250.png" alt="No data illustration"/>
                </div>)
              }
          </main>
    </div>
   )

 }