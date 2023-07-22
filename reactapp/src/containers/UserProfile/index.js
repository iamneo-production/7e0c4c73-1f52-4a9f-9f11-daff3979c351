import {ProfilePage} from './ProfilePage';
import {Review} from './Review';
import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { NavBar } from '../../Components/Navbar';


import "./style.css";

export const Profile = () => {
  const [userDetail, setUserDetail] = useState({});
  const [reviews, setReviews] = useState([]);
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
        if(response.status == 200){
          setUserDetail(response.data);
        }
        else{
          window.location.href = process.env.REACT_APP_FRONTEND_URL + 'signin';
        }
      }).catch((err)=>{
        window.location.href = process.env.REACT_APP_FRONTEND_URL + 'signin';
      })
      axios.get(process.env.REACT_APP_BACKEND_URL + 'review/user?id=' + user.userId).then((response) => {
        if(response.status == 200){
          setReviews(response.data);
        }
        else{
          setReviews([]);
        }
      }).catch((err)=>{
        setReviews([]);
      })
    }
  }, []);
  return (
    <div className='userProfileContainer'>
      <NavBar/>
      <h1 className='prifile-h1'>Movie Reviews</h1>
      {
        userDetail && 
        <ProfilePage
        name={userDetail.name}
        email={userDetail.email}
        role={userDetail.role}
      />
      }
      
      <h2 className='prifile-h2'>Reviews</h2>
      { reviews && reviews.length > 0 && reviews.map((review, index) => (
        <Review
          key={index}
          name={review.movie.title}
          stars={review.rating}
          comment={review.reviewNote}
        />
      ))}
    </div>
  );
};