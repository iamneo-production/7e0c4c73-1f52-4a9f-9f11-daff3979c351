import React from 'react';
//import './style.css';

export const Review = ({ name, stars, comment }) => {
  return (
    <div>
      <h3 className='profile-h3'>Movie Name: {name}</h3>
      <p className='prifile-p'>Rating: {stars}</p>
      <p className='prifile-p'>Review: {comment}</p>
      <hr className='prifile-hr' />
    </div>
  );
};
