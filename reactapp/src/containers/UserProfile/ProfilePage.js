import React from 'react';
import './style.css';

export const ProfilePage = (props) => {

  return (
    <div className="profile">
      <hr className='prifile-hr' />
      <h2 className='prifile-h2'>Profile</h2>
      <h4 className='prifile-h4'><p className='prifile-p'>Name: {props.name}</p>
      <p className='prifile-p'>E-mail: {props.email}</p>
      <p className='prifile-p'>User Role: {props.role}</p>
      </h4>
      
    </div>
  );
};