import React, { useState ,useEffect} from "react";
import './SearchBar.css';
import axios from "axios";

const SearchBar=({setResults})=>{
    const [input,setInput]=useState("");

    const url = process.env.REACT_APP_BACKEND_URL+'search/movie/';
    const getResults = async () => {
      try {
        const response = await axios.get(url + input);
        const responseData = response.data;
        if (responseData && Array.isArray(responseData)) {
          const filteredList = responseData.filter((movie) =>
            movie.title.toLowerCase().includes(input.toLowerCase())
          );
          setResults(filteredList);
        } 
        else {
          setResults([]);
        }
      } catch (err) {
        console.log(err);
        setResults([]);
      }
    }
    
    useEffect(()=> {
      getResults();
    },[input]);

    const handleTheValue=(value)=>{
        setInput(value);
    }

    const handleSearch = (e) => {
      e.preventDefault();
      if (input && (input.trim() != '')) {
        window.location.href = process.env.REACT_APP_FRONTEND_URL + 'search/' + input;
      }
    }

    return (
          <form className="container" onSubmit={handleSearch}>
            <input 
              className="search-input" 
              placeholder="Search the movies..." 
              value={input} 
              onChange={(event)=>handleTheValue(event.target.value)}/>
            <button className="search-btn" onClick={handleSearch}>Search</button>
          </form>
    );
}


export default SearchBar;