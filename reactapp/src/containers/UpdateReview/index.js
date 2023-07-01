import axios from 'axios';
import React,{ useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';

const url = process.env.REACT_APP_BACKEND_URL+'reviews/'

export const UpdateReview = (props) => {

  var { reviewId } = useParams();

  const [review, setReview] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    reviewId = reviewId.trim();
    if (reviewId) {
      axios.get(url + reviewId).then((response) => {
        setReview(response.data);
        setReviewText(response.data.reviewText);
        setRating(response.data.rating);
       
      })
    }
  }, []);

  const handleDelete = (e) => {
    if (window.confirm("Are you sure you want to delete the Post by " + review.userId.name)) {
      axios.delete(url + reviewId, {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
      }).then((response) => {
        if (response.status == 200) {
          alert("Successfully Deleted the Post");
          window.location.href = process.env.REACT_APP_FRONTEND_URL+'movie/' + review.movieId.movieId;
        } else {
          alert("unable to Successfully delete the Post");
        }
      }).catch((err) => {
        alert(err + " unable to Successfully delete the Post");
        if (err.response.status == 401) {
          window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
        }
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (reviewText && reviewText.trim() != '') formdata.append('reviewText', reviewText);
    if (rating && rating != '') formdata.append('rating', rating);
    if (reviewText == review.reviewText && rating == review.rating) {
      alert("Nothing to update");
    }
    else {
      if (window.confirm("Are you sure you want to Update the Post by " + review.userId.name)) {
        axios.put(url + reviewId, formdata, {
          headers: {
            'Authorization': `Bearer ${window.localStorage.getItem('token')}`
          }
        }).then((response) => {
          alert("Review post updated successfully");
          window.location.href = process.env.REACT_APP_FRONTEND_URL+'movie/' + review.movieId.movieId;
        }).catch((err) => {
          alert("Unable to Update the Review Post")
          if (err.response.status == 401) {
            window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
          }
        })
      }
    }

  }



  return (
    <div className="container">
    <h3 className="title">Update Review Of{review && review.userId&&review.userId.name}</h3>
      <div key={review.userId} className="review-item">
        <h2 className="movie-title">{review.userId.movieName}</h2>
        <p className="username">Username:{review.userId.name}</p>
        <textarea 
        className="review-text"
        value={review.reviewText}
        onChange={(e) => { setReviewText(e.target.value);}}
        style={{
	          height: `${Math.max(2, Math.ceil(review.reviewText.length / 50))}em`,
              width: '700px',
              resize: 'none',
            }}
        />
        <div className="rating-container">
          <p className="rating-label">Rating:</p>
          <div className="star-rating">
          {[...Array(5)].map((_,index) =>(
          <span 
            key={index}
            className={`star ${index<rating ? 'filled' : 'empty'}`}
            onClick={(e) => setRating(e.target.value)}
            style={{cursor:'pointer'}}
          >
          &#9733;
          </span> 
        ))}
        </div>
      </div>
    <div className="button-container">
        <button className="update-btn"
        onClick={handleSubmit}> Submit </button>
        <button className="delete-btn" onClick={handleDelete}>
        Delete
        </button>
    </div>
  </div>
</div>
)

}