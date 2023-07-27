import React from "react";
import './SearchResultsList.css';
import SearchResult from "../SearchResult/SearchResult";

const SearchResultsList = ({ results }) => {
    return (
        <div className="results-div">
            {results.map((result, index) => (
                // <SearchResult className="result" result={result} key={index} />
                <p key={index}>{result?.title}</p>
            ))}
        </div>
    );
}

export default SearchResultsList;
