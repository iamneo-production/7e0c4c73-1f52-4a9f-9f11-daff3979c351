import React, { useState,useEffect } from 'react'
import './ReviewCard.css';
import axios from 'axios';

export const ReviewCard = ({eachReview,isAdmin}) => {

    const [name,setName] = useState('');

    useEffect(()=>{
        const formdata = new FormData();
        formdata.append('userId',eachReview.userId);
        axios.post(process.env.REACT_APP_BACKEND_URL + 'user/detail',formdata).then((response)=>{
            if(response.status == 200){
                setName(response.data.name);
            }
            else{
                setName('');
            }
        }).catch((err)=>{
            setName('');
        })
    },[])
    return(
        <div className="rcard">
            <div className="rcard-header">
                <h2 className="name">{name}</h2>
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
            <p className="review">{eachReview.reviewNote}</p>
        </div>
    );
}


