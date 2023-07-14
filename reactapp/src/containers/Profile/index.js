import React from 'react';
import Profile from './Profile';
import Review from './Review';

const ProfileSection = ({ profile, reviews }) => {
  return (
    <div>
      <h1>Movie Reviews</h1>
      <Profile
        name={profile.name}
        email={profile.email}
        filmsRated={profile.filmsRated}
      />
      <h2>Reviews</h2>
      {reviews.map((review, index) => (
        <Review
          key={index}
          name={review.name}
          stars={review.stars}
          comment={review.comment}
        />
      ))}
    </div>
  );
};

export default ProfileSection;

