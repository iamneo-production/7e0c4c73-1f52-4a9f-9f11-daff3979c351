import React from 'react';

const Review = ({ name, stars, comment }) => {
  return (
    <div>
      <h3>Movie Name: {name}</h3>
      <p>Stars: {stars}</p>
      <p>Comment: {comment}</p>
      <hr />
    </div>
  );
};

export default Review;

