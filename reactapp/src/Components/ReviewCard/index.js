import React from 'react'
import './ReviewCard.css';

export const ReviewCard = ({eachReview,isAdmin}) => {
    return(
        <div className="rcard">
            <div className="rcard-header">
                <h2 className="name">{eachReview.userId}</h2>
                <div className="rating-header">
                    <p className="rating">{eachReview.rating}</p>
                    <p className="out-five">/5.0</p>
                    {(isAdmin)?
                        (<span classsName='button-span'>
                            <button 
                                className='edit-button'
                                onClick={(e)=>{
                                    window.location.href = process.env.REACT_APP_FRONTEND_URL+'updateReview/'+eachReview.reviewId;
                                }}
                                >Update review</button>
                            </span>):null
                    }
                </div>
            </div>
            <p className="review">{eachReview.review}</p>
        </div>
    );
}



// import React from 'react'

// const ReviewCard = ({reviews,isAdmin}) => {
//     return(
//         <div>
//             {reviews.map((item, index) => (
//                 <div className="rcard" key={index}>
//                 <div className="rcard-header">
//                     <h2 className="name">item.name</h2>
//                     <div className="rating-header">
//                     <p className="rating">{item.rating}</p>
//                     <p className="out-five">/5.0</p>
//                     {(isAdmin)?(
//                         <span classsName='button-span'>
//                             <button 
//                             className='edit-button'
//                             onClick={(e)=>{
//                                 window.location.href = process.env.REACT_APP_FRONTEND_URL+'updateReview/'+review.reviewId;
//                             }}
//                             >Edit</button>
//                             </span>):null}
//                     </div>
//                 </div>
//                 <p className="review">{item.review}</p>
//                 </div>
//             ))}
//         </div>
//     );
// }
// export default ReviewCard;