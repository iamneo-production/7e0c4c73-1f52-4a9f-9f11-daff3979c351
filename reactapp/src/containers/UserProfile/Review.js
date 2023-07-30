import React from 'react';
import './style.css';

export const Review = ({ name, stars, comment }) => {
  return (
    <div>
      <h3 className='profile-h3'>Movie Name: {name}</h3>
      <p className='profile-p'>Rating: {stars}</p>
      <p className='profile-p'>Review: {comment}</p>
      <hr className='profile-hr' />
    </div>
  );
};