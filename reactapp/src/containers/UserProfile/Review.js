import React from 'react';
//import './style.css';

const Review = ({ name, stars, comment }) => {
  return (
    <div>
      <h3>Movie Name: {name}</h3>
      <p>Rating: {stars}</p>
      <p>Review: {comment}</p>
      <hr />
    </div>
  );
};

export default Review;

