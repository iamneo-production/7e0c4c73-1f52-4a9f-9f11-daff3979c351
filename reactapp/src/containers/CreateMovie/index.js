import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './createmovie.css';

export const CreateMovie = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [genre, setGenre] = useState('');
  const [plotSummary, setPlotSummary] = useState('');
  const [poster, setPoster] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the release date to dd/mm/yyyy format
    const formattedReleaseDate = formatDate(releaseDate);

    const formData = new FormData();
    formData.append('movieTitle', movieTitle);
    formData.append('releaseDate', formattedReleaseDate);
    formData.append('genre', genre);
    formData.append('plotSummary', plotSummary);
    formData.append('poster', poster);

    try {
      // Sending data to backend API endpoint
      const response = await axios.post('/movie', formData);

      if (response.status === 200) {
        
        console.log('Movie data saved successfully');
        // Reset the form fields
        setMovieTitle('');
        setReleaseDate('');
        setGenre('');
        setPlotSummary('');
        setPoster(null);
      } 
      else 
      {
        // Handle error
        console.log('Error saving movie data');
      }
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

