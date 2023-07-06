import React, { useState } from 'react'
import axios from 'axios';



const baseURL = process.env.REACT_APP_BACKEND_URL+'signup'

export const SignUp = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('user');
  const [signupResult,setSignupResult] = useState(null);
  const a='';
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name == null || name == '' || email == null || email == '' || password == null || password == '' || type == null || type == '') {
      setSignupResult('Incomplete Fields');
      return;
    }
    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("type", type);
    axios.post(baseURL,formdata,{
      validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
  }).then((response)=>{
      if(response.status == 200){
        setSignupResult('Registered Successfully');
      }
      else if(response.status == 400){
        setSignupResult('Email already registered');
      }
      else{
        setSignupResult('Failed to Register User Try after some time');
      }
  }).catch((err)=>{
    setSignupResult('Failed to Register User Try after some time')
  });
  }


  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} >
          <label>
            Name:
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
          </label><br />
          <label>
            Email:
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label><br />
          <label>
            Password:
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label><br />
          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)} required >
              <option value='user' >User</option>
              <option value='admin' >Admin</option>
            </select>
          </label><br />
          <button type='submit' >Sign Up</button>
        </form>
      </div>
      <div>
        {signupResult && <p>{signupResult}</p>}
      </div>
    </div>
  )

}
