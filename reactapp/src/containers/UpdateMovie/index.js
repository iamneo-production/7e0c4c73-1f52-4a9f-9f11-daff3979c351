import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';


const url = 'http://localhost:8080/api/movies/'

export const UpdateMovie = (props) => {

  var { movieId } = useParams();

  const [movie, setMovie] = useState({ 'title': '' });
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    movieId = movieId.trim();
    if (movieId) {
      axios.get(url + movieId).then((response) => {
        setMovie(response.data);
        setTitle(response.data.title);
        setGenre(response.data.genre);
        setReleaseDate(response.data.releaseDate);
        setDescription(response.data.description);
        
      })
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if(title && title.trim() != '') formdata.append('title',title);
    if(genre && genre.trim() != '') formdata.append('genre',genre);
    if(releaseDate) formdata.append('releaseDate',dayjs(releaseDate).format('DD/MM/YYYY'));
    if(description && description.trim() != '') formdata.append('description',description);
    if(poster) formdata.append('poster',poster);
    if(title == movie.title && genre == movie.genre && releaseDate == movie.releaseDate && description == movie.description && poster == null){
      alert("Nothing to Update");
    }
    else{
      axios.put(url+movieId,formdata,{
        headers : {
          'Authorization' : `Bearer ${window.localStorage.getItem('token')}`
        }
      }).then((response)=>{
        if(response.status == 200){
          alert('Successfully Updated Movie');
          window.location.href = 'http://localhost:8081/movie/'+movieId;
        }
        else{
          alert('Unable to update the Movie')
        }
      }).catch((err)=>{
        if(err.response.status == 401){
          window.location.href = 'http://localhost:8081/signin';
        }
        else alert(err + " Unable to update Movie");
      })
    }
  }


  return (
    <div>
      <h3>Update Movie details of {movie.title}</h3>
      <form onSubmit={handleSubmit}>
        <input type='text' value={title} onChange={(e) => {
          setTitle(e.target.value);
        }} />

        <input type='text' value={genre} onChange={(e) => {
          setGenre(e.target.value);
        }} />

        <input type='date' value={releaseDate} onChange={(e) => {
          setReleaseDate(e.target.value);
        }} />

        <input type='text' value={description} onChange={(e) => {
          setDescription(e.target.value);
        }} />

        <input type='file' onChange={(e) => {
          setPoster(e.target.files[0]);
        }} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )

}