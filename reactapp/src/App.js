// import logo from './logo.svg';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import Home from './containers/Home';
import SignUp from './containers/SignUp';
import SignIn from './containers/SignIn';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
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
