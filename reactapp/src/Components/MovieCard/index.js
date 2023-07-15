import React, { useState } from "react";
import "./MovieCard.css";



export const MovieCard = ({ movie }) => {


  const { title, plotSummary, genre, releaseDate, poster, rating } = movie;
  
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
        <img className="card-img" src={process.env.REACT_APP_BACKEND_URL + 'image/'+ poster } alt="movie-card" />
      </div>
      {isHovered && (
        <div className="card-details">
          <div>
            <span className="title">{title}</span>
          </div>
          <div>
            <span className="release-date">Release Date :</span>
            <span className="value">{releaseDate}</span>
          </div>
          <div>
            <span className="genre">Genre :</span>
            <span className="value">{genre}</span>
          </div>
          <div>
            <span className="cast-detail">Plot Summary :</span>
            <span className="value">{plotSummary}</span>
          </div>

          <div className="ratings">
            <div>
                <span className="rating-icon">&#9733;</span>
                <span className="rating-value">{rating}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};