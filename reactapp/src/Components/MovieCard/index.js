import React from 'react'
import './index.css';



export const MovieCard = (props) => {
    const {movie} = props;
  return(
    <div className='cardContainer'>
      <a href={'http://localhost:8081/movie/' + movie.movieId} >
        <img src={'http://localhost:8080/image/'+movie.poster } className='movieImage' />
        <h3 className='movieTitle' >{movie.title}</h3>
        <h5 className='movieRating' >{movie.rating}</h5>
      </a>
    </div>
   )

 }