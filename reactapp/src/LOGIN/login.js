import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import './logincss.css'

function Login({setLoggedIn, setAdminIn,setToken}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate ();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            const response = await axios.post('https://8080-cffceecfebadebddaccdaedadeeaffeddeafeaeaadbdbabf.project.examly.io/api/signin', formData);
            const { token, isAdmin } = response.data;
            localStorage.setItem('token', token);
            setToken(token);

            if (isAdmin) {
                setAdminIn(true);
                setLoggedIn(false);
                console.log(token);
                navigate('/');
            } else {
                setLoggedIn(true);
                setAdminIn(false);
                navigate('/');
                console.log(token);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };

    //Redirect to register page
    const handleRegister=()=>{
        navigate('/register')
    }

    return (
        <div><h2>Movie Review</h2>
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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
                <button type="submit" className="btn btn-primary">Login</button><br></br>
                <button type="button" className="btn btn-primary" onClick={handleRegister}>Register</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
        </div>
    );
}

export default Login;
