import React from "react";
import './SearchResult.css';
const SearchResult = ({ result }) => { 

    // const handleResultClick = () => {
    //     alert(`You clicked on ${result.name}`);
    // };

    return (
        <div className="result-wrapper" 
        onClick={(e)=>{
            window.location.href=process.env.REACT_APP_FRONTEND_URL + 'movie/'+ result.movieId;
           }}
        // onClick={handleResultClick}
        >
            {/* <span><img src={process.env.REACT_APP_BACKEND_URL + 'image/'+ result.poster} alt={result.title} /></span> */}
            <span><p>{result.title}</p></span>
            {/* <span><p>{new Date(result.releaseDate).toDateString()}</p></span> */}
        </div>
    );
}

export default SearchResult;
