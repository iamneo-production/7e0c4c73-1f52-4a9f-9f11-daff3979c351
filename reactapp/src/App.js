import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import { Home } from './containers/Home';
import { SignIn } from './containers/SignIn';
import { SignUp } from './containers/SignUp';
import { MovieList } from './containers/MovieList';
import { Movie } from './containers/Movie';
import { UpdateMovie } from './containers/UpdateMovie';
import { UpdateReview } from './containers/UpdateReview';
import { CreateMovie } from './containers/CreateMovie';
import { UpdateCastList } from './containers/UpdateCastList';
import { Profile } from './containers/UserProfile';
import {CreateCast} from './containers/CreateCast'

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
          <Route path='/updateCast/:movieId' element={<UpdateCastList/>} />
          <Route path='/updateReview/:reviewId' element={<UpdateReview/>} />
          <Route path='/createmovie' exact element={<CreateMovie/>}/>
          <Route path='/profile' exact element={<Profile/>}/>
          <Route path='/createCast' exact element={<CreateCast/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;