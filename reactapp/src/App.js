import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import { Home } from './containers/Home';
import { SignIn } from './containers/SignIn';
import { SignUp } from './containers/SignUp';
import { MovieList } from './containers/MovieList2';
import { Movie } from './containers/Movie';
import { UpdateMovie } from './containers/UpdateMovie';
<<<<<<< HEAD
import { UpdateCast } from './containers/UpdateCast/index';
=======
>>>>>>> 7c4aa19cfd5bdc52df6d376f582480f32d5c01ec
import { UpdateReview } from './containers/UpdateReview';
import { CreateMovie } from './containers/CreateMovie';
import { UpdateCastList } from './containers/UpdateCastList';

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
<<<<<<< HEAD
          <Route path='/UpdateCast/:movieId' element={<UpdateCast/>} />
=======
          <Route path='/updateCast/:movieId' element={<UpdateCastList/>} />
>>>>>>> 7c4aa19cfd5bdc52df6d376f582480f32d5c01ec
          <Route path='/updateReview/:reviewId' element={<UpdateReview/>} />
          <Route path='/createmovie' exact element={<CreateMovie/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
