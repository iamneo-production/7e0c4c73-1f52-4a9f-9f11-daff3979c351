import React, {useState} from 'react'
import {UseNavigate} from 'react-router-dom'
import axios from 'axios';

const UpdateCast = () => {
      const navigate = UseNavigate();
      const [role,setRole] = useState('user')
      const[Castid,setCastid]=useState('')
      const[Castname,setCastname]=useState('')
      const[Movieid,setMovieid]=useState('')
      const[option,setOption]=useState('')
      const submit = async (e) => {
        e.preventDefault();
        
      }
    return (
      <div>
         <form onSubmit={(e) =>submit(e)}>
                <label>CastID</label>
                <input type="text" placeholder="Enter CastID"/>
                <label>Cast Name</label>
                <input type="text" placeholder="Enter Name"/>
                <label>movieID</label>
                <input type="text" placeholder="Enter MovieID"/>
                <label>Choose the option</label>
                <select OnChange={(e) => optionselect(e)}>
                  
                </select>
                <div><button>submit</button></div>
            </form>
      </div>
    );
}

export default UpdateCast;