import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavBar } from '../../Components/Navbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';


const url = process.env.REACT_APP_BACKEND_URL + 'movie/'

export const UpdateMovie = (props) => {

  let { movieId } = useParams();

  const [movie, setMovie] = useState({ 'title': '' });
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    movieId = movieId.trim();
    if (movieId) {
      axios.get(url + '?id=' + movieId).then((response) => {
        setMovie(response.data[0]);
        setTitle(response.data[0].title);
        setGenre(response.data[0].genre);
        setReleaseDate(new Date(response.data[0].releaseDate));
        setDescription(response.data[0].plotSummary);
        
      })
    }
  }, []);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('movieId', movieId);
    const formattedReleaseDate = formatDate(releaseDate);
    if (title && title.trim() !== '') formdata.append('title', title);
    if (genre && genre.trim() !== '') formdata.append('genre', genre);
    if (releaseDate) formdata.append('releaseDate', formattedReleaseDate);
    if (description && description.trim() !== '') formdata.append('plotSummary', description);
    if (poster) formdata.append('poster', poster);
    if (title === movie.title && genre === movie.genre && releaseDate === movie.releaseDate && description === movie.description && poster === null) {
      alert("Nothing to Update");
    }
    else {
      axios.put(url, formdata, {
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
      }).then((response) => {
        if (response.status === 200) {
          alert('Successfully Updated Movie');
          window.location.href = process.env.REACT_APP_FRONTEND_URL + 'movie/' + movieId;
        }
        else {
          alert('Unable to update the Movie')
        }
      })

        .catch((err) => {
          if (err.response.status === 401) {
            window.location.href = process.env.REACT_APP_FRONTEND_URL + 'signin';
          }
          else alert(err + " Unable to update Movie");
        })
    }
  }


  const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this movie')){
      axios.delete(process.env.REACT_APP_BACKEND_URL + 'movie?movieId='+movieId,{
        headers: {
          'Authorization': `Bearer ${window.localStorage.getItem('token')}`
        }
      }).then((response)=>{
        alert('Successfully Deleted Movie');
        window.location.href = process.env.REACT_APP_FRONTEND_URL;
      }).catch((err)=>{
        if(err.response.status == 401){
          window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
        }
        else alert('Could not delete Movie');
      })
    }
  }



  return (
    <div className='updatemovie'>
    <div className='updateMovieApp'>
      <NavBar />
      <h2 className='updateMovieH2' >Update Movie Page {movie.title}</h2>
      <form onSubmit={handleSubmit} className='updateMovieForm'>

        <div className='Movietitle'>
        <label htmlFor="title">Movie Title:</label>
        <input type='text' placeholder='Title' value={title} onChange={(e) => {
          setTitle(e.target.value);
        }} />
        </div>
        <div className='genre'>
        <label htmlFor="Genre">Genre:</label>
        <input type='text' placeholder='genre' value={genre} onChange={(e) => {
          setGenre(e.target.value);
        }} />
        </div>
        <div className='releasedate'>
        <label htmlFor="Releasedate">Release Date:</label>
        <DatePicker
            id="releaseDate"
            selected={releaseDate}
            onChange={(date) => setReleaseDate(date)}
            dateFormat="dd/MM/yyyy"
          />
          </div>
          <div className='plotsummary'>
        <label htmlFor="PlotSummary">PlotSummary:</label>
        <textarea id='plotSummary' placeholder='plotSummary' value={description} onChange={(e) => {
          setDescription(e.target.value);
        }} />
        </div>
        <div className='setposter'>
        <label htmlFor="Setposter:">Set Poster:</label>
        <input type='file' onChange={(e) => {
          setPoster(e.target.files[0]);
        }} />
        </div>
        <br />
        <div className='link-btn'>
        <button type='submit'>Submit</button>
        </div>
      </form>
      <button onClick={handleDelete} className='updateMovieDeleteButton' >Delete Movie</button>
    </div>
    </div>
  )

}