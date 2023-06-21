import axios from 'axios';
import React,{ useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';

const url = 'http://localhost:8080/api/reviews/'

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
          window.location.href = 'http://localhost:8081/movie/' + review.movieId.movieId;
        } else {
          alert("unable to Successfully delete the Post");
        }
      }).catch((err) => {
        alert(err + " unable to Successfully delete the Post");
        if (err.response.status == 401) {
          window.location.href = 'http://localhost:8081/signin';
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
          window.location.href = 'http://localhost:8081/movie/' + review.movieId.movieId;
        }).catch((err) => {
          alert("Unable to Update the Review Post")
          if (err.response.status == 401) {
            window.location.href = 'http://localhost:8081/signin';
          }
        })
      }
    }

  }

  return (
    <div>
      <h3>Update Review Of {review && review.userId && review.userId.name}</h3>
      <button onClick={handleDelete} >Delete Post</button>
      <form onSubmit={handleSubmit}>
        <input type='text' value={reviewText} onChange={(e) => {
          setReviewText(e.target.value);
        }} />

        <input type='range' min={0} max={5} value={rating} onChange={(e) => {
          setRating(e.target.value);
        }} />
        <button type='submit' >Submit</button>
      </form>
    </div>
  )

}