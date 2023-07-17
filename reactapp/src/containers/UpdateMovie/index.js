import axios from 'axios';
import React, {  useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import './index.css';


const url = process.env.REACT_APP_BACKEND_URL+'movie/'

export const UpdateMovie = (props) => {

  let { movieId } = useParams();

  const [movie, setMovie] = useState({ 'title': '' });
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState(null);

  useRef(() => {
    movieId = movieId.trim();
    if (movieId) {
      axios.get(url +'?id='+ movieId).then((response) => {
        setMovie(response.data[0]);
        setTitle(response.data[0].title);
        setGenre(response.data[0].genre);
        setReleaseDate(response.data[0].releaseDate);
        setDescription(response.data[0].description);
        
        
      })
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('movieId',movieId);
    if(title && title.trim() !== '') formdata.append('title',title);
    if(genre && genre.trim() !== '') formdata.append('genre',genre);
    if(releaseDate) formdata.append('releaseDate',dayjs(releaseDate).format('DD/MM/YYYY'));
    if(description && description.trim() !== '') formdata.append('plotSummary',description);
    if(poster) formdata.append('poster',poster);
    if(title === movie.title && genre === movie.genre && releaseDate === movie.releaseDate && description === movie.description && poster === null){
      alert("Nothing to Update");
    }
    else{
      axios.put(url,formdata,{
        headers : {
          'Authorization' : `Bearer ${window.localStorage.getItem('token')}`
        }
      }).then((response)=>{
        if(response.status === 200){
          alert('Successfully Updated Movie');
          window.location.href = process.env.REACT_APP_FRONTEND_URL+'movie/'+movieId;
        }
        else{
          alert('Unable to update the Movie')
        }
      })
      
      .catch((err)=>{
        if(err.response.status === 401){
          window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
        }
        else alert(err + " Unable to update Movie");
      })
    }
  }




  return (
    <div>
      <h2>Update Movie Page {movie.title}</h2>
      <form onSubmit={handleSubmit}>
      

        <label htmlFor="title">Movie Title:</label>
        <input type='text' placeholder='Title' value={title} onChange={(e) => {
          setTitle(e.target.value);
        }} />
<label htmlFor="Genre">Genre:</label>
        <input type='text'placeholder='genre' value={genre} onChange={(e) => {
          setGenre(e.target.value);
        }} />
<label htmlFor="Releasedate">Release Date:</label>
        <input type='date'placeholder='releasedate' value={releaseDate} onChange={(e) => {
          setReleaseDate(e.target.value);
        }} />
<label htmlFor="PlotSummary">PlotSummary:</label>
        <textarea id='plotSummary' placeholder='plotSummary' value={description} onChange={(e) => {
          setDescription(e.target.value);
        }} />
<label htmlFor="Setposter:">Set Poster:</label>
        <input type='file'  onChange={(e) => {
          setPoster(e.target.files[0]);
        }} />
        <br />
        <button  type='submit'>Submit</button>
      </form>
    </div>
  )

}