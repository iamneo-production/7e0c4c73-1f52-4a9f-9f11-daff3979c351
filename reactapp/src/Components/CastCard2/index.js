import React from 'react'
import './card.css';

export const CastCard = ({cast}) => {
  return (
    <div className='cast-item'>
      <img src={process.env.REACT_APP_BACKEND_URL+'image/' + cast.poster} className='image' />
      <p className='cast-name' >{cast.name}</p>
    </div>
  );
};
