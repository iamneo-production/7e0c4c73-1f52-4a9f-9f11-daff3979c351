import React from 'react'
import './index.css';

export const CastCard = ({cast}) => {
  return (
    <div className='cardContainer'>
      <img src={process.env.REACT_APP_BACKEND_URL+'image/' + cast.poster} className='image' />
      <h3 className='name' >{cast.name}</h3>
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
