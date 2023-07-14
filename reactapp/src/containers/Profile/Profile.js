import React from 'react';

const Profile = () => {
  const name = 'John Doe';
  const email = 'johndoe@example.com';
  const filmsRated = 2;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>No. of Films Rated: {filmsRated}</p>
    </div>
  );
};

export default Profile;


