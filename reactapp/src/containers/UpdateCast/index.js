import React, {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import axios from 'axios';

const UpdateCast = () => {
      const navigate = useNavigate();
      const [role,setRole] = useState('user')
      const[Castid,setCastid]=useState('')
      const[Castname,setCastname]=useState('')
      const[Movieid,setMovieid]=useState('')
      const[Casts,setCasts]=useState([])
      const[Option,setOption]=useState("")

      var {movieId} = useParams()

      useEffect(() => {
        movieId = movieId.trim();
        var token = window.localStorage.getItem('token');
        var user = JSON.parse(window.localStorage.getItem('user'));
        if (token && user && (user['role'] === 'ADMIN')){
          
        }
            
    
            
              
      },[])
      
      
      
      const submit = async (e) => {
        e.preventDefault();
        
      }
    return (
      <div>
         <form onSubmit={(e) =>submit(e)}>
                <label>CastID</label>
                <input type="text" placeholder="Enter CastID" value = {Castid} onChange={(e) => setCastid(e.target.value)}/>
                <label>Cast Name</label>
                <input type="text" placeholder="Enter Name" value = {Castname} onChange={(e) => setCastname(e.target.value)}/>
                <label>movieID</label>
                <input type="text" placeholder="Enter MovieID" value = {Movieid} onChange={(e) => setMovieid(e.target.value)}/>
                <label>Choose the option</label>
                <select value = {Option} onChange={(e) => setOption(e.target.value)}>
                  <option value = "Add Cast">Add Cast</option>
                  <option value = "Delete Cast">Delete Cast</option>
                </select>
                <div><button>submit</button></div>
            </form>
      </div>
    );
}

export default UpdateCast;