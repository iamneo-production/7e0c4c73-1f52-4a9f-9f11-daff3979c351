import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MovieCard } from '../../Components/MovieCard';
import './index.css';


const url = 'http://localhost:8080/api/search/movies/'

export const MovieList = (props) => {
    var { key } = useParams();
    const [movies,setMovies] = useState(null);
    useEffect(()=>{
        key = key.trim();
        if(key && key != ''){
            axios.get(url+key).then((response)=>{
                setMovies([...response.data]);
            })
        }
    },[]);
  return(
    <div>
        {
            (movies && movies.length > 0)? 
            (<div className='listContainer' >
                {
                    movies.map((movie,i)=>
                        <MovieCard movie={movie} key={i}/>
                    )
                }
            </div>)
            :
            (<div>
                Did not match any Search
            </div>)
        
        }
    </div>
   )

 }