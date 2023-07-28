import React from "react";
import './SearchResult.css';
const SearchResult = ({ result }) => { 



    return (
        <div className="result-wrapper" 
        onClick={(e)=>{
            window.location.href=process.env.REACT_APP_FRONTEND_URL + 'movie/'+ result.movieId;
           }}
        >
            <span><p>{result.title}</p></span>
        </div>
    );
}

export default SearchResult;
