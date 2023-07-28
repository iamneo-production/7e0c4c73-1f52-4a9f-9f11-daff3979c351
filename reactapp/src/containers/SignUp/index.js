import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link } from 'react-router-dom';
import './index.css'
const url = process.env.REACT_APP_BACKEND_URL+'signup'

export const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signupStatus, setSignupStatus] = useState('');
  const [role,setRole] = useState('USER');
  const navigate = useNavigate ();


  const handleSubmit = async (e) => {
    e.preventDefault();


    // Check password length
    if (password.length < 8) {
      setPasswordError('Password should be at least 8 characters long');
      return;
    }else{
      setPasswordError('');
    }


    // Check password confirmation
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }else{
      setPasswordError('');
    }


    // Sending data in the form of formData
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('role', role);


    try {
      const response = await axios.post(
        url,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          validateStatus: function (status) {
            return status >= 200 && status <= 400; // Consider all status codes between 200 and 400 as successful
          },
        }
      );

      if (response.status === 200) {
        console.log('Signup successful');
        console.log(role);
        setSignupStatus('Signup successful, Please click on Login');
      } 
      else if(response.status === 400) {
        console.log('Email is already registered');
        setSignupStatus('Email is already registered');
      }
      else{
          console.log('Failed to Register User Try after some time');
          setSignupStatus('Failed to Register User Try after some time');
      }

    } catch (error) {
      console.log('Failed to Register User Try after some time');
      setSignupStatus('Failed to Register User Try after some time');
      console.log(error.response);
    }
  };
  const handleAlreadyRegistered = () => {
    navigate('/signin'); // Navigate to "/signin" route when clicked
  };


  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="Role">
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)} required >
              <option value='USER' >User</option>
              <option value='ADMIN' >Admin</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div><br/>
        {passwordError && <p className="error-message">{passwordError}</p>}
        <button type="submit" className="btn-register">Sign Up</button>
        <p>
        Already registered..?{' '}
        <Link to="/signin" onClick={handleAlreadyRegistered}>Sign In</Link> {/* Add the Link component */}
       </p>
      </form>
      {signupStatus && <p className="error-message">{signupStatus}</p>}
    </div>
  );
};