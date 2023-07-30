import React from 'react'
import './card.css';

export const Card = ({cast}) => {
  return (
    <div className='c-item'>
      <img src={process.env.REACT_APP_BACKEND_URL+'image/' + cast.poster} className='imge' />
      <div className='c-name' >{cast.name}</div>
    </div>
  );
};
