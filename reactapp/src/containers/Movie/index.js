import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader} from 'reactstrap';
import axios from 'axios';
import { CastCard } from '../../Components/CastCard'
import {ReviewCard} from '../../Components/ReviewCard/ReviewCard.js'
import 'bootstrap/dist/css/bootstrap.css';
import '../../containers/Movie/index.css';
// import 'reactapp/src/containers/Movie/index.css'
const url = process.env.REACT_APP_BACKEND_URL+'movie/'

export const Movie = (props) => {
  var { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [review, setReview] = useState(null);
  const [rating, setRating] = useState(null);
  const [modal, setModal] = useState(false);
  var user = JSON.parse(window.localStorage.getItem('user'));

  const isAdmin = (user && user['isAdmin']=='ADMIN')?true:false;

  /* textarea height control*/
  const handleTextareaChange = (event) => {
    setReview(event.target.value);
    adjustTextareaHeight(event.target);
  };
  const adjustTextareaHeight = (textarea) => {
    const maxHeight=200;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  };
  /* textarea height control*/

  const handleReviewPost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if ((review && review.trim != '') || (rating && rating >= 0 && rating <= 5)) {
      formData.append("reviewText", review);
      formData.append("rating", rating);
      formData.append("movieId", movieId);
      const token = window.localStorage.getItem('token');
      axios.post(process.env.REACT_APP_BACKEND_URL+'review', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        if (response.status == 200) {
          window.location.reload();
        }
        if (response.status == 401) {
          window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
        }
      })

    }
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    movieId = movieId.trim();
    if (movieId) {
      axios.get(process.env.REACT_APP_BACKEND_URL + movieId).then((response) => {
        setMovie(response.data);
      })
      axios.get(process.env.REACT_APP_BACKEND_URL + 'review/' + movieId).then((response) => {
        setReviews(response.data);
      })
    }
  }, []);

  return (

    <div className='App'>

      {(movie)?
        (
          <div>
            {/* movie details and poster stuff display */}
            <div className="film-poster" 
              style={{
                background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("${process.env.REACT_APP_BACKEND_URL+'image/' + movie.poster}")`,
              }}
              >
              <h1 className="filmTitle">{movie.title}</h1>
              <div className="description">
                <div className="details-of-the-film">
                  <p>Genre</p>
                  <p>Runtime</p>
                  <p>Rating : {movie.rating}</p>
                </div>
                <p className="summary">{movie.plotSummary}</p>
              </div>
            </div>

            {/* Update button */}
            {(isAdmin)?
              (<button 
                className='large-button'
                onClick={(e) => {
                  window.location.href = process.env.REACT_APP_FRONTEND_URL+'updateMovie/' + movieId;
                  }
                }
                >Update movie</button>):(null)
            }

            {/* Cast display */}
            
            <h3 className='cast-heading'>Cast</h3>
            {
              movie.cast ? (
                <div>
                  <div className='cast-grid'>
                    {movie.cast.map((item, index) => (
                      <CastCard key={index} cast={item} isAdmin={isAdmin} />
                    ))}
                  </div>
                  {isAdmin && (
                    <button
                      id="upload-btn"
                      className="large-button"
                      onClick={(e) => {
                        window.location.href = process.env.REACT_APP_FRONTEND_URL + 'addCast/' + movieId;
                      }}
                    >
                      Update Cast
                    </button>
                  )}
                </div>
              ) : (
                <h4 className='statement'>No cast information as of now</h4>
              )
            }
            

            {/* Review display */}
            <h3 className="reviewHeading">Reviews</h3>
            {
              (reviews)?
                (
                  reviews.map((item,index) =>(
                    <ReviewCard eachReview={item} isAdmin={isAdmin} key={index}></ReviewCard>
                  ))
                ):(
                  <h4 className="statement">No reviews. But plenty of room for your sweet words. Share them now</h4>
                )
            }

            {/* Add review button */}
            {
              (isAdmin)?
              (null):(
                <button
                    className="large-button" 
                    onClick={(e) => {
                      const token = window.localStorage.getItem('token');
                      user = JSON.parse(window.localStorage.getItem('user'));
                      if (token && user && user['email']) {
                        const formdata = new FormData();
                        formdata.append('email', user['email']);
                        axios.post(process.env.REACT_APP_BACKEND_URL+'authenticate', formdata, {
                          headers: {
                            'Authorization': `Bearer ${token}`
                          }
                        }).then((response) => {
                          toggleModal(); 
                          //Navigating the modal
                        }).catch((err) => {
                          window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
                        })
                      }
                      else {
                        window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
                      }
                    }} 
                  >Add your Review</button>
              )
            }
          </div>):
        (<h3 className='statement'>Movie has not fetched yet.</h3>)
        }

      {/* Modal */}
      <Modal size="lg" isOpen={modal} toggle={toggleModal} className='pop-up-modal'>
        <ModalHeader closeClassName={toggleModal}>
          <div className='header-elements'>
            <div className='pop-up-heading'><h4>Add your review</h4></div>
            <div className='close-btn-div'>
              <button className="custom-close-btn" onClick={toggleModal}>
                Close
              </button>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className='reviewBox'>
            <textarea
                className="reviewInput"
                id="inputField"
                type="text"
                placeholder="Add your review"
                value={review}
                onChange={handleTextareaChange}
              />
            <input
                className="ratingInput"
                id="rating"
                type="number"
                placeholder="Rate the film (0-5)"
                min="0"
                max="5"
                step="0.1"
                value={rating}
                onChange={(event) => setRating(event.target.value)}/>
            <button className='submitBtn' id="submitButton" onClick={handleReviewPost}>
                Submit
              </button>
          </div>
        </ModalBody>
      </Modal>

    </div>
  )
}


// <div>
    //   <div>
    //     {(movie) ? (
    //       <div>
    //         <div className="film-poster">
    //           <h1 className="filmTitle">{movie.title}</h1>
    //           <div className="description">
    //             <div className="details-of-the-film">
    //               <p>Genre</p>
    //               <p>Runtime</p>
    //               <p>Rating : {movie.rating}</p>
    //             </div>
    //             <p className="summary">{movie.plotSummary}</p>
    //           </div>
    //         </div>

    //         {/* <img src={process.env.REACT_APP_BACKEND_URL+'image/' + movie.poster} />
    //         <h2>{movie.title}</h2> 
    //         image is used in css and heading is done
    //         */}
    //         <button 
    //           onClick={(e) => {
    //             var token = window.localStorage.getItem('token');
    //             user = JSON.parse(window.localStorage.getItem('user'));
    //             if (token && user && user['email']) {
    //               const formdata = new FormData();
    //               formdata.append('email', user['email']);
    //               axios.post(process.env.REACT_APP_BACKEND_URL+'authenticate', formdata, {
    //                 headers: {
    //                   'Authorization': `Bearer ${token}`
    //                 }
    //               }).then((response) => {
    //                 setPostReviewShow(true); 
    //                 //Navigating the modal
    //               }).catch((err) => {
    //                 window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
    //               })
    //             }
    //             else {
    //               window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
    //             }
    //           }} 
    //         >Review</button>

    //         {
    //           user && user['isAdmin'] && (
    //             <div>
    //               <button onClick={(e) => {
    //                 window.location.href = process.env.REACT_APP_FRONTEND_URL+'updateMovie/' + movieId;
    //               }} >Update Movie</button>
    //               {/* <button onClick={(e) => {
    //                 if (window.confirm('Are you sure you want to delete' + movie.title) == true) {
    //                   var token = window.localStorage.getItem('token');
    //                   axios.delete(url + movieId, {
    //                     headers: {
    //                       'Authorization': `Bearer ${token}`
    //                     }
    //                   }).then((response) => {
    //                     window.location.href = process.env.REACT_APP_FRONTEND_URL;
    //                   }).catch((err) => {
    //                     if (err.status >= 400 && err.status <= 405) {
    //                       window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
    //                     }
    //                     else {
    //                       console.log('Unable to delete Movie');
    //                     }
    //                   })
    //                 }
    //               }} >Delete Movie</button> */}
    //             </div>
    //           )
    //         }
    //         {/* <h4>{movie.rating}</h4> */}
    //         {/* <p>{movie.description}</p> */}
    //         {(movie.cast) ? (
    //           <div> {/*Casts*/}
    //             {
    //               user && user['role']=='ADMIN' && (
    //                 <button onClick={(e) => {
    //                   window.location.href = process.env.REACT_APP_FRONTEND_URL+'addCast/' + movieId;
    //                 }}>Add Cast</button>
    //               )
    //             }
    //             {
    //               movie.cast.map((cast, i) => <CastCard key={i} cast={cast} />)
    //             }
    //           </div>
    //         ) : null}
            
    //         {(reviews) ? (
    //           <div> 
    //             {/* Reviews */}
    //             {
    //               <div>
    //                 <ReviewCard reviews={reviews} isAdmin={isAdmin}/>
    //               </div>
    //             }
    //             {/* {
    //               reviews.map((review, i) =>
    //                 <div key={i} >
    //                   {review.reviewText && <p>{review.reviewText}</p>}
    //                   {
    //                     user && user['isAdmin'] && (
    //                       <button onClick={(e)=>{
    //                         window.location.href = process.env.REACT_APP_FRONTEND_URL+'updateReview/'+review.reviewId;
    //                       }} >Update Review</button>
    //                     )
    //                   }
    //                   {review.rating && <p>Rating: {review.rating}</p>}
    //                 </div>
    //               )
    //             } */}
    //           </div>
    //         ) : null}
    //       </div>
    //     ) : (
    //       <h3>Could not Find the movie</h3>
    //     )}
    //   </div>

      {/* 
      Modal previous
      <Modals show={postReviewShow} handleClose={() => { setPostReviewShow(false); setReview(''); setRating(null); }} modalTitle={'Review'} handleSubmit={handleReviewPost} >
        <form onSubmit={handleReviewPost}>
          <input type='text' value={review} onChange={(e) => setReview(e.target.value)} />
          <input type='range' min={0} max={5} value={rating} onChange={(e) => setRating(e.target.value)} />
          <button type='submit' >Post</button>
        </form>
      </Modals> 
      */}

      {/* Modal I created */}
    //   <Modal size="lg" isOpen={postReviewShow} toggle={setPostReviewShow(!postReviewShow)} className='pop-up-modal'>
    //     <ModalHeader closeClassName={toggleModal}>
    //       <div className='header-elements'>
    //         <div className='pop-up-heading'><h4>Add your review</h4></div>
    //         <div className='close-btn-div'>
    //           <button className="custom-close-btn" onClick={setPostReviewShow(!postReviewShow)}>
    //             Close
    //           </button>
    //         </div>
    //       </div>
    //     </ModalHeader>
    //     <ModalBody>
    //       <div className='reviewBox'>
    //         <textarea
    //             className="reviewInput"
    //             id="inputField"
    //             type="text"
    //             placeholder="Add your review"
    //             value={review}
    //             onChange={handleTextareaChange}
    //           />
    //         <input
    //             className="ratingInput"
    //             id="rating"
    //             type="number"
    //             placeholder="Rate the film (0-5)"
    //             min="0"
    //             max="5"
    //             step="0.1"
    //             value={rating}
    //             onChange={(event) => setRating(event.target.value)}/>
    //         <button className='submitBtn' id="submitButton" onClick={handleReviewPost}>
    //             Submit
    //           </button>
    //       </div>
    //     </ModalBody>
    //   </Modal>
    // </div>
