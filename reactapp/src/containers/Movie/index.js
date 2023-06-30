import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CastCard } from '../../Components/CastCard'
import { Modals } from '../../Components/Modals';
import 'bootstrap/dist/css/bootstrap.css';


const url = process.env.REACT_APP_BACKEND_URL+'movies/'

export const Movie = (props) => {
  var { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  const [postReviewShow, setPostReviewShow] = useState(false);

  var user = JSON.parse(window.localStorage.getItem('user'));

  const handleReviewPost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if ((review && review.trim != '') || (rating && rating >= 0 && rating <= 5)) {
      formData.append("reviewText", review);
      formData.append("rating", rating);
      formData.append("movieId", movieId);
      const token = window.localStorage.getItem('token');
      axios.post(process.env.REACT_APP_BACKEND_URL+'reviews', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        if (response.status == 200) {
          window.location.reload();
        }
      }).catch((err)=>{
        if (response.status == 401) {
          window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
        }
        //alert something went wrong
      })

    }
  }

  useEffect(() => {
    movieId = movieId.trim();
    if (movieId) {
      axios.get(url + movieId).then((response) => {
        setMovie(response.data);
      })
      axios.get(url + 'reviews/' + movieId).then((response) => {
        setReviews(response.data);
      })
    }
  }, []);

  return (
    <>
      <div>
        {(movie) ? (
          <div>
            <img src={process.env.REACT_APP_BACKEND_URL+'image/' + movie.poster} />
            <h2>{movie.title}</h2> <button onClick={(e) => {
              var token = window.localStorage.getItem('token');
              user = JSON.parse(window.localStorage.getItem('user'));
              if (token && user && user['email']) {
                const formdata = new FormData();
                formdata.append('email', user['email']);
                axios.post(process.env.REACT_APP_BACKEND_URL+'authenticate', formdata, {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }).then((response) => {
                  setPostReviewShow(true);
                }).catch((err) => {
                  window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
                })
              }
              else {
                window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
              }
            }} >Review</button>
            {
              user && user['isAdmin'] && (
                <>
                  <button onClick={(e) => {
                    window.location.href = process.env.REACT_APP_FRONTEND_URL+'updateMovie/' + movieId;
                  }} >Update Movie</button>
                  <button onClick={(e) => {
                    if (window.confirm('Are you sure you want to delete' + movie.title) == true) {
                      var token = window.localStorage.getItem('token');
                      axios.delete(url + movieId, {
                        headers: {
                          'Authorization': `Bearer ${token}`
                        }
                      }).then((response) => {
                        window.location.href = process.env.REACT_APP_FRONTEND_URL;
                      }).catch((err) => {
                        if (err.status >= 400 && err.status <= 405) {
                          window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
                        }
                        else {
                          console.log('Unable to delete Movie');
                        }
                      })
                    }
                  }} >Delete Movie</button>
                </>
              )
            }
            <h4>{movie.rating}</h4>
            <p>{movie.description}</p>
            {(movie.cast) ? (
              <div> Casts
                {
                  user && user['isAdmin'] && (
                    <button onClick={(e) => {
                      window.location.href = process.env.REACT_APP_FRONTEND_URL+'addCast/' + movieId;
                    }}>Add Cast</button>
                  )
                }
                {
                  movie.cast.map((cast, i) => <CastCard key={i} cast={cast} />)
                }
              </div>
            ) : null}
            
            {(reviews) ? (
              <div> Reviews
                {
                  reviews.map((review, i) =>
                    <div key={i} >
                      {review.reviewText && <p>{review.reviewText}</p>}
                      {
                        user && user['isAdmin'] && (
                          <button onClick={(e)=>{
                            window.location.href = process.env.REACT_APP_FRONTEND_URL+'updateReview/'+review.reviewId;
                          }} >Update Review</button>
                        )
                      }
                      {review.rating && <p>Rating: {review.rating}</p>}
                    </div>
                  )
                }
              </div>
            ) : null}
          </div>
        ) : (
          <h3>Could not Find the movie</h3>
        )}
      </div>

      <Modals show={postReviewShow} handleClose={() => { setPostReviewShow(false); setReview(''); setRating(null); }} modalTitle={'Review'} handleSubmit={handleReviewPost} >
        <form onSubmit={handleReviewPost}>
          <input type='text' value={review} onChange={(e) => setReview(e.target.value)} />
          <input type='range' min={0} max={5} value={rating} onChange={(e) => setRating(e.target.value)} />
          {/* <button type='submit' >Post</button> */}
        </form>
      </Modals>
    </>
  )

}

