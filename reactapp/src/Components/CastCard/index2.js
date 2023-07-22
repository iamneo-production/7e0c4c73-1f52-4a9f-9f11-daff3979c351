import React from 'react'
import './index.css';


export const Card = (props) => {
  const { cast, handleAdd } = props;
  return (
    <div className='cardContainer'>
      <img src={process.env.REACT_APP_BACKEND_URL+'image/' + cast.poster} className='image' />
      <button className="btn" onClick={(e)=>handleAdd(cast.castId)}>+</button>
      <h3 className='name' >{cast.name}</h3>
    </div>
  )

}