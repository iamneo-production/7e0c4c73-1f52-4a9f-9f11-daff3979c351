import React, { useState } from 'react';
import './index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const MovieForm = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert the release date to dd/mm/yyyy format
    const formattedReleaseDate = formatDate(releaseDate);

    const formData = {
      movieTitle: movieTitle,
      releaseDate: formattedReleaseDate,
      genre: genre,
      description: description,
      poster: poster
    };

    try {
      // Send the form data to the backend API endpoint
      const response = await fetch('/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Data saved successfully
        console.log('Movie data saved successfully');
        // Reset the form fields
        setMovieTitle('');
        setReleaseDate('');
        setGenre('');
        setDescription('');
        setPoster('');
      } else {
        // Handle the error if data couldn't be saved
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
          type="date"
          id="releaseDate"
          selected={releaseDate}
          onChange={(date) => setReleaseDate(date)}
          dateFormat="dd/MM/yyyy"
  />
</div>

      <div className="form-field">
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label htmlFor="poster">Poster:</label>
        <input
          type="file"
          id="poster"
          onChange={(e) => setPoster(e.target.files[0])}
        />
      </div>
      <button type="submit">Create Movie</button>
    </form>
  );
};

export default MovieForm;
