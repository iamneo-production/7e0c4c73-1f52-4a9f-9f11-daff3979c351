import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.css';

const url = process.env.REACT_APP_BACKEND_URL + 'review/';

export const UpdateReview = () => {
  
  const { reviewId } = useParams();
  const [movie,setMovie]=useState(null);
  const [review, setReview] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`${url}?id=${reviewId}`);
        console.log(response.data[0]);
        setReview(response.data[0]);
        setReviewText(response.data[0].reviewNote);
        setRating(response.data[0].rating);
        setMovie(response.data[0].movie);
      } catch (error) {
        console.error(error);
      }
    };

    if (reviewId) {
      fetchReview();
    }
  }, [reviewId]);

  const handleDelete =  async() => {
    try {
      const confirmation = window.confirm(
        `Are you sure you want to delete the Post by ${review?.userId}`
      );
      if (confirmation) {
       await axios.delete(`${url}?id=${reviewId}`, {
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
          },
        });
        alert('Successfully Deleted the Post');
        window.location.href = process.env.REACT_APP_FRONTEND_URL;
      }
    } catch (error) {
      console.error(error);
      alert('Unable to Successfully delete the Post');
      if (error.response && error.response.status === 401) {
        window.location.href = process.env.REACT_APP_FRONTEND_URL + 'signin';
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('reviewId',reviewId);
    if (reviewText && reviewText.trim() !== '') {formdata.append('reviewNote', reviewText);
  console.log(reviewText);}
  
    if (rating && rating !== '') {formdata.append('rating', rating); console.log(rating);}
    if (reviewText === review?.reviewNote && rating === review?.rating) {
      alert('Nothing to update');
    } else {
      try {
        const confirmation = window.confirm(
          `Are you sure you want to Update the Post by ${review?.userId}`
        );
        if (confirmation) {
          console.log(formdata.get('reviewNote'));
          const response =  axios.put(process.env.REACT_APP_BACKEND_URL+'review', formdata,{
            headers : {
              'Authorization' : `Bearer ${window.localStorage.getItem('token')}`
            }
          });
          alert('Review post updated successfully');
          window.location.href = process.env.REACT_APP_FRONTEND_URL;
        }
      } catch (error) {
        console.error(error);
        alert('Unable to Update the Review Post');
        if (error.response && error.response.status === 401) {
          window.location.href = process.env.REACT_APP_FRONTEND_URL + 'signin';
        }
      }
    }
  };

  if (!review) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
    <div className="container">
      <h3 className="title">Update Review Of {review?.userId}</h3>
      <div className="review-item">
        <div className='image-container'>
           <img src={process.env.REACT_APP_BACKEND_URL+'image/'+movie.poster} />
         </div> 
        <h2 className="movie-title">{review?.movie?.title}</h2>
        <p className="username">UserId: {review?.userId}</p>
        <textarea
          className="review-text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          style={{
            height: `100px`,
            width: '700px',
            resize: 'none',
          }}
        />` `
        <div className="rating-container">
          <p className="rating-label">Rating:</p>
          <div className="star-rating">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${index < rating ? 'filled' : 'empty'}`}
                onClick={() => setRating(index + 1)}
                style={{ cursor: 'pointer' }}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <div className="button-container">
          <button className="update-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};
