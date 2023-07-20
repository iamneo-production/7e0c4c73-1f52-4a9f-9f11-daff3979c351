import React from 'react';
//import './style.css';

const ProfilePage = () => {
  const name = 'John Doe';
  const email = 'johndoe@example.com';
  const filmsRated = 2;

  return (
    <div className="profile">
      <hr />
      <h2>Profile</h2>
      <h4><p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>No. of Films Rated: {filmsRated}</p>
      </h4>
      
    </div>
  );
};

export default ProfilePage;


