import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { CastCard } from '../../Components/CastCard';


export const UpdateCastList = (props) => {

    var { movieId } = useParams();
    var searchWord1='';

    const [movie, setMovie] = useState({'title':''});
    const [castId, setCastId] = useState(null);
    const [casts, setCasts] = useState([]);

    

    useEffect(() => {
        movieId = movieId.trim();
        var token = window.localStorage.getItem('token');
        var user = JSON.parse(window.localStorage.getItem('user'));
        if (token && user && user['email']) {
            const formdata = new FormData();
            formdata.append('email', user['email']);
            axios.post(process.env.REACT_APP_BACKEND_URL+'authenticate', formdata, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                if (response.status != 202) {
                    window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin'
                }
                if (movieId) {
                    axios.get(process.env.REACT_APP_BACKEND_URL+'movies/' + movieId).then((response) => {
                        setMovie(response.data);
                    })
                }
            }).catch((err) => {
                window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
            })
        }
        else {
            window.location.href = process.env.REACT_APP_FRONTEND_URL+'signin';
        }
    }, []);


    const handleSearch = (e) => { 
        searchWord1 = e.target.value;
        if (searchWord1 && searchWord1.trim() != '') {
            axios.get(process.env.REACT_APP_BACKEND_URL+'search/cast/' + searchWord1).then((response) => {
                setCasts([...response.data]);
            }).catch((err) => {
                setCasts([]);
            })
        }
    }



    const handleSubmit = (cast) => {
        if (castId != null && movieId != null) {
            if (window.confirm('Are you sure You want to add ' + cast.name + ' to ' + movie.title)) {
                const formdata = new FormData();
                formdata.append('castId', castId);
                formdata.append('movieId', movieId);
                const token = window.localStorage.getItem('token');
                axios.post(process.env.REACT_APP_BACKEND_URL+'movies/cast', formdata, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((e) => {
                    window.location.href = process.env.REACT_APP_FRONTEND_URL+'movie/' + movieId;
                }).catch((err) => {
                    if(err.response.status == 400){
                        alert(err + ' : Cast already added to movie!')
                    }
                    else alert(err + ' : Could not add cast to movie!')
                })
            }else{
                setCastId(null);
            }
        }
    }

    return (
        <div>
            <h3>Add Cast for {movie.title}</h3>
            <input type='text' onChange={handleSearch} />
            <div>
                casts
            {
                casts && casts.length > 0 && (
                    casts.map((cast, i) => <div key={i} onClick={(e) => {
                        setCastId(cast.castId);
                        handleSubmit(cast);
                    }} ><CastCard cast={cast} /> </div>)
                )
            }
            </div>
        </div>
    )

}