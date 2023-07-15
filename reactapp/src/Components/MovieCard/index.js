<<<<<<< HEAD
// import React from 'react'
=======
import React from 'react'
>>>>>>> 7c4aa19cfd5bdc52df6d376f582480f32d5c01ec
// import './index.css';



<<<<<<< HEAD
// export const MovieCard = (props) => {
//     const {movie} = props;
//   return(
//     <div className='cardContainer'>
//       <a href={'http://localhost:8081/movie/' + movie.movieId} >
//         <img src={'http://localhost:8080/image/'+movie.poster } className='movieImage' />
//         <h3 className='movieTitle' >{movie.title}</h3>
//         <h5 className='movieRating' >{movie.rating}</h5>
//       </a>
//     </div>
//    )

//  }

import React, { useState } from "react";
import "./Moviecard.css";



export const MovieCard = ({ movie }) => {


  const { name, imdb_rating, genre, duration, img_link, cast_name } = movie;
  
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    // division to check hover
    // shows only image until user hover over the image
    <div
      className={`card-container ${isHovered ? "hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      <div className="card-img-container">
        <img className="card-img" src={img_link} alt="movie-card" />
      </div>
      {isHovered && (
        <div className="card-details">
          <div>
            <span className="title">{name}</span>
          </div>
          <div>
            <span className="release-date">Release Date :</span>
            <span className="value">Coming Soon</span>
          </div>
          <div>
            <span className="genre">Genre :</span>
            <span className="value">{genre}</span>
          </div>
          <div>
            <span className="cast-detail">Cast :</span>
            <span className="value">{cast_name}</span>
          </div>

          <div className="ratings">
            <div>
                <span className="rating-icon">&#9733;</span>
                <span className="rating-value">{imdb_rating}</span>
            </div>
            <div>
                <span>{duration} min</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
=======
export const MovieCard = (props) => {
    const {movie} = props;
  return(
    <div className='cardContainer'>
      <a href={process.env.REACT_APP_FRONTEND_URL+'movie/' + movie.movieId} >
        <img src={process.env.REACT_APP_BACKEND_URL+'image/'+movie.poster } className='movieImage' />
        <h3 className='movieTitle' >{movie.title}</h3>
        <h5 className='movieRating' >{movie.rating}</h5>
      </a>
    </div>
   )

 }

// import React, { useState } from "react";
// import "./MovieCard.css";



// export const MovieCard = ({ movie }) => {


//   const { name, imdb_rating, genre, duration, img_link, cast_name } = movie;
  
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     // division to check hover
//     // shows only image until user hover over the image
//     <div
//       className={`card-container ${isHovered ? "hovered" : ""}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >

//       <div className="card-img-container">
//         <img className="card-img" src={img_link} alt="movie-card" />
//       </div>
//       {isHovered && (
//         <div className="card-details">
//           <div>
//             <span className="title">{name}</span>
//           </div>
//           <div>
//             <span className="release-date">Release Date :</span>
//             <span className="value">Coming Soon</span>
//           </div>
//           <div>
//             <span className="genre">Genre :</span>
//             <span className="value">{genre}</span>
//           </div>
//           <div>
//             <span className="cast-detail">Cast :</span>
//             <span className="value">{cast_name}</span>
//           </div>

//           <div className="ratings">
//             <div>
//                 <span className="rating-icon">&#9733;</span>
//                 <span className="rating-value">{imdb_rating}</span>
//             </div>
//             <div>
//                 <span>{duration} min</span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
>>>>>>> 7c4aa19cfd5bdc52df6d376f582480f32d5c01ec
