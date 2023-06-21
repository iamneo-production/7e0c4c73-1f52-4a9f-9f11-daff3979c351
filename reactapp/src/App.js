
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import { Home } from './containers/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/signup' exact element={<SignUp/>} />
          <Route path='/signin' exact element={<SignIn/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
