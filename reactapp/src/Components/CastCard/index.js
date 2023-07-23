import React from 'react'
import './index.css';

export const CastCard = ({cast,handleDelete}) => {
  return (
    <div className='cast-item'>
      <img src={process.env.REACT_APP_BACKEND_URL+'image/' + cast.poster} className='imge' />
      <p className='cast-name' >{cast.name}</p>
      <button className='del-btn' onClick={(e) => handleDelete(cast)}>X</button>
    </div>
  );
};

  // export const CastCard = (props) => {
  //   const { cast } = props;
  //   return (
  //     <div className='cardContainer'>
  //       <img src={'http://localhost:8080/image/' + cast.poster} className='image' />
  //       <h3 className='name' >{cast.name}</h3>
  //     </div>
  //   )

  // }