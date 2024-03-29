import React, { useState } from 'react';
import axios from 'axios';
import { NavBar } from '../../Components/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './createmovie.css';

export const CreateMovie = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [genre, setGenre] = useState('');
  const [plotSummary, setPlotSummary] = useState('');
  const [poster, setPoster] = useState(null);

  const handleSubmit =  (e) => {
    e.preventDefault();

    // Convert the release date to dd/mm/yyyy format
    const formattedReleaseDate = formatDate(releaseDate);

    const formData = new FormData();
    formData.append('title', movieTitle);
    formData.append('releaseDate', formattedReleaseDate);
    formData.append('genre', genre);
    formData.append('plotSummary', plotSummary);
    formData.append('poster', poster);

    try {
      // Sending data to backend API endpoint
      const response =  axios.post(process.env.REACT_APP_BACKEND_URL+'movie', formData,{
        headers : {
          'Authorization' : `Bearer ${window.localStorage.getItem('token')}`
        }
      }).then((response)=>{
        if(response.status==200){
          alert('Movie data saved successfully');
        // Reset the form fields
        setMovieTitle('');
        setReleaseDate('');
        setGenre('');
        setPlotSummary('');
        setPoster(null);
        const movieId = response.data.movieId;
        window.location.href= process.env.REACT_APP_FRONTEND_URL + 'movie/'+movieId;
      } 
      else 
      {
        // Handle error
        console.log('Error saving movie data');
      }
        }
      ).catch((err)=>{
        if(err.response.status == 401){
          window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
        }
        else if(err.response.status == 500){
          alert('Image size should be less that 1MB and plotsummary should be less than 2000 character');
        }
        else{
          alert('Error saving movie data');
        }
      });
      console.log(response);
        
        
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <NavBar />
      <h2>Create Movie Page</h2>
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-field">
          <label htmlFor="movieTitle">Movie Title:</label>
          <input
            type="text"
            id="movieTitle"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="releaseDate">Release Date:</label>
          <DatePicker
            id="releaseDate"
            selected={releaseDate}
            onChange={(date) => setReleaseDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>

        <div className="form-field">
          <label htmlFor="genre">Genre:
          </label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="plotSummary">Plot Summary:
          </label>
          <textarea
            id="plotSummary"
            value={plotSummary}
            onChange={(e) => setPlotSummary(e.target.value)}
          ></textarea>
        </div>

        <div className="form-field">
          <label htmlFor="poster">Poster:
          </label>
          <input
            type="file"
            id="poster"
            onChange={(e) => setPoster(e.target.files[0])}
          />
        </div>

        <div className="spacer"></div>
        <div className="form-field button-container">
          <button type="submit">Create Movie
          </button>
        </div>
      </form>
    </div>
    
  );
};