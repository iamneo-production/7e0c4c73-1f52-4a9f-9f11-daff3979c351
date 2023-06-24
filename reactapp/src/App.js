<<<<<<< HEAD
import React, { useState } from "react";
import './App.css';
import Login from './LOGIN/login';
import Register from './LOGIN/register';
import Admin from './ADMIN/admin';
import Home from './HOME/home';

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

function App() {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminIn, setAdminIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <div className="link-container">
          {(loggedIn === false || adminIn === false) ? <div><Link to={"/"} className="btn btn-primary">Home</Link></div> : null}
          {(loggedIn === false && adminIn === false) ? <div><Link to={"/login"} className="btn btn-primary">Login</Link></div> : null}
          {(adminIn === true) ? <div><Link to={"/admin"} className="btn btn-primary">Admin</Link></div> : null}
          {(loggedIn === true || adminIn === true) ? <div><Link to={"/login"} className="btn btn-primary">Logout</Link></div> : null}
        </div>

        <Routes>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} setAdminIn={setAdminIn} setToken={setToken} />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<div>Page Not Found!</div>} />
        </Routes>
      </div>
    </Router>
=======

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import { Home } from './containers/Home';
import { SignIn } from './containers/SignIn';
import { SignUp } from './containers/SignUp';
import { MovieList } from './containers/MovieList';
import { Movie } from './containers/Movie';
import { UpdateMovie } from './containers/UpdateMovie';
import { AddCast } from './containers/AddCast';
import { UpdateReview } from './containers/UpdateReview';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/signin' exact element={<SignIn/>} />
          <Route path='/signup' exact element={<SignUp/>} />
          <Route path='/search/:key' element={<MovieList/>} />
          <Route path='/movie/:movieId' element={<Movie/>} />
          <Route path='/updateMovie/:movieId' element={<UpdateMovie/>} />
          <Route path='/addCast/:movieId' element={<AddCast/>} />
          <Route path='/updateReview/:reviewId' element={<UpdateReview/>} />
        </Routes>
      </Router>
    </div>
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
  );
}

export default App;
