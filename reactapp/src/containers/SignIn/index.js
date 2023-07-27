import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';

const url = process.env.REACT_APP_BACKEND_URL+'signin'
export function SignIn() {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email', emailId);
    formData.append('password', password);
    try {
      const response = await axios.post(url, formData);
      const { token, userId,email,name,role } = response.data;
    
      if (response.status === 200) {
        if (role==='ADMIN' ) {
        //Admin user login--setting adminIn value as true and loggedIn value as false 
        //If any value required please use this format localStorage.setItem('Token',token) to store it in local storage and can access throughout the project
          console.log('Admin login successful');
          localStorage.setItem('token',token);
          localStorage.setItem('loggedIn', false);
          localStorage.setItem('adminIn', true);
          localStorage.setItem('user',JSON.stringify({
            'userId':userId,
            'email': email,
            'role': role,
            'name': name
          }));
          console.log('token: ' +localStorage.getItem('token'));
          const userData = localStorage.getItem('user');
          console.log(JSON.parse(userData));

          console.log('adminIn: ' + localStorage.getItem('adminIn'));
          console.log('loggedIn: ' + localStorage.getItem('loggedIn'));
          navigate('/');
        } 
        else {
        //Normal user login--setting adminIn value as fasle and loggedIn value as true
        //If any values are required please use this format localStorage.setItem('Token',token) to store it in local storage and can access those values from any folder in this project
          console.log('User login successful');
          
          localStorage.setItem('Token',token);
          localStorage.setItem('loggedIn', true);
          localStorage.setItem('adminIn', false);
          localStorage.setItem('user',JSON.stringify({
            'userId':userId,
            'email': email,
            'role': role,
            'name': name
          }));
          console.log('token: ' +localStorage.getItem('token'));
          const userData = localStorage.getItem('user');
          console.log(JSON.parse(userData));

          console.log('adminIn: ' + localStorage.getItem('adminIn'));
          console.log('loggedIn: ' + localStorage.getItem('loggedIn'));
          navigate('/');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };


  // Redirect to register page
  const handleRegister = () => {
    navigate('/signup');
  };


  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            className="form-control"
            value={emailId}
            onChange={(event) => setEmailId(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <br/>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <br />
        <button type="button" className="btn btn-primary" onClick={handleRegister}>
          Register
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
}