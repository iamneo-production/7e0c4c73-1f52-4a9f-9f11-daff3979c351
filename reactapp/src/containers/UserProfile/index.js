//import React from 'react';
import ProfilePage from './Profile';
import Review from './Review';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { NavBar } from '../../Components/Navbar';


//import "./style.css";

const Profile = () => {
  const [userDetail, setUserDetail] = useState('');
  const [reviews, setReviews] = useState('');
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const formData = new FormData();
    formData.append("userId", user.userId);
    if (user && user.userId) {
      axios.post(process.env.REACT_APP_BACKEND_URL + 'user/detail', formData, {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem("token")}`
        }
      }).then((response) => {
        setUserDetail(response.data);
      })
      axios.get(process.env.REACT_APP_BACKEND_URL + 'review/user?id=' + user.UserId).then((response) => {
        setReviews(response.data);
      })
      console.log(userDetail, reviews);
    }
  }, []);
  return (
    <div>
      <NavBar/>
      <h1>Movie Reviews</h1>
      <ProfilePage
        name={userDetail.name}
        email={userDetail.email}
        filmsRated={userDetail.filmsRated}
      />
      <h2>Reviews</h2>
      {/* {reviews.map((review, index) => (
        <Review
          key={index}
          name={review.name}
          stars={review.stars}
          comment={review.comment}
        />
      ))} */}
    </div>
  );
};

export default Profile;

