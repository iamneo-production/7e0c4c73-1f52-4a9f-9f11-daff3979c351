import React, { useState } from 'react'
import axios from 'axios';
import './index.css'

const baseURL = process.env.REACT_APP_BACKEND_URL+'signin';


export const SignIn = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const handleSubmit = (e) =>{
        const formdata = new FormData();
        formdata.append("email",email);
        formdata.append("password",password);
        axios.post(baseURL,formdata,{
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
              }
        }).then((response)=>{
            if(response.status == 200) {
                window.localStorage.setItem("token" , response.data.token);
                const user = {
                    "email" : email,
                    "userId" : response.data.userId,
                    "isAdmin" : response.data.isAdmin
                }
                window.localStorage.setItem("user" , JSON.stringify(user));
                console.log(JSON.parse(window.localStorage.getItem("user")));
                window.location.href='/';
            }
            else{
                document.getElementById("unauthorizedBlock").style.setProperty("display","block");
            }
        });
        e.preventDefault();
    }







    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="text-center text-dark mt-5">Login Form</h2>
                    <div className="card my-5">

                        <form className="card-body cardbody-color p-lg-5">

                            {/* <div className="text-center">
                                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                                    width="200px" alt="profile"/>
                            </div> */}

                            <div className="mb-3">
                                <input type="text" className="form-control" id="Username" required aria-describedby="emailHelp"
                                    placeholder="User Name" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                            </div>
                            <div className="mb-3">
                                <input type="password" className="form-control" id="password" required placeholder="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            </div>
                            <div className="text-center"><button type="submit" className="btn btn-color px-5 mb-5 w-100" onClick={handleSubmit}>Login</button></div>
                            <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
                                Registered? <a href="/signup" className="text-dark fw-bold"> Create an
                                    Account</a>
                            </div>
                        </form>
                    </div>
                    <div className='unauthorized' id='unauthorizedBlock'>
                            <h3>Email or Password Incorrect</h3>
                    </div>

                </div>
            </div>
        </div>
    )

}