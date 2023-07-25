import React from 'react';
import './style.css';

export const ProfilePage = (props) => {

  return (
    <div className="profile">
      <hr className='profile-hr' />
      <h2 className='profile-h2'>Profile</h2>
      <h4 className='profile-h2'><p className='profile-p'>Name: {props.name}</p>
      <p className='profile-p'>E-mail: {props.email}</p>
      <p className='profile-p'>User Role: {props.role}</p>
      </h4>
      
    </div>
  );
};