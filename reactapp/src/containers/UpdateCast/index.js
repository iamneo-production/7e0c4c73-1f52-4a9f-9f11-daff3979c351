import React, {useState} from 'react'
import {UseNavigate} from 'react-router-dom'
import axios from 'axios';

const UpdateCast = () => {
      const navigate = UseNavigate();
      const [role,setRole] = useState('user')
      const submit = async (e) => {
        e.preventDefault();
        const response = await axios,post()
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
                <div><button>submit</button></div>
            </form>
      </div>
    );
}

export default UpdateCast;