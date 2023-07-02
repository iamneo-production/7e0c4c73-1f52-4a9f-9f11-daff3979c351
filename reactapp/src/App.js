import React from 'react';
import './App.css';
import axios from "axios"
import { useEffect, useState } from 'react';
// import { MovieCard } from './components/MovieCard/MovieCard';
import { MovieCard } from './Components/MovieCard';
import { MovieList } from './containers/MovieList2';


function App () {

    

  return (
    
        <div className="App">
          <MovieList />

        </div>
      
  );
};

export default App;
