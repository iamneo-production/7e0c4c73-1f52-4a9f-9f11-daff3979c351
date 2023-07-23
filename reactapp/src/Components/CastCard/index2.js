import React from 'react'
import './index.css';


export const Card = (props) => {
  const { cast, handleAdd } = props;
  return (
    <div className='cardContainer'>
      <img src={process.env.REACT_APP_BACKEND_URL+'image/' + cast.poster} className='image' />
      <button className="add-btn" onClick={(e)=>handleAdd(cast)}>+</button>
      <h3 className='cast-name' >{cast.name}</h3>
    </div>
  )

}