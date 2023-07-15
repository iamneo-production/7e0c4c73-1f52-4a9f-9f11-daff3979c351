import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { CastCard } from '../../Components/CastCard/index';
import {Card} from '../../Components/CastCard/index1'
import './UpdateCast.css'

export const AddCast = (props) => {

    var { movieId } = useParams();
    var searchWord1='';
    const navigate = useNavigate()
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
                    navigate(process.env.REACT_APP_FRONTEND_URL+'signin')
                }
                if (movieId) {
                    axios.get(process.env.REACT_APP_BACKEND_URL+'movie?id=' + movieId).then((response) => {
                        setMovie(response.data);
                    })
                }
            }).catch((err) => {
                navigate(process.env.REACT_APP_FRONTEND_URL+'signin');
            })
        }
        else {
            navigate(process.env.REACT_APP_FRONTEND_URL+'signin');
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



    const handleAdd = (cast) => {
        setCastId(cast.castId)
        if (castId != null && movieId != null) {
            if (window.confirm('Are you sure You want to add ' + cast.name + ' to ' + movie.title)) {
                const formdata = new FormData();
                formdata.append('castId', castId);
                formdata.append('movieId', movieId);
                const token = window.localStorage.getItem('token');
                axios.post(process.env.REACT_APP_BACKEND_URL+'movie/cast', formdata, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((e) => {
                    navigate(process.env.REACT_APP_FRONTEND_URL+'movie/' + movieId);
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
    const handleDelete = (cast) => {
        setCastId(cast.castId)
        if (castId != null && movieId != null) {
            if (window.confirm('Are you sure You want to delete ' + cast.name + ' to ' + movie.title)) {
                const token = window.localStorage.getItem('token');
                axios.delete(process.env.REACT_APP_BACKEND_URL+'movie/cast?castId='+ castId +'&movieId='+ movieId, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((e) => {
                    navigate(process.env.REACT_APP_FRONTEND_URL+'movie/' + movieId);
                }).catch((err) => {
                    if(err.response.status == 401){
                        alert(err + ' : Cast already deleted to movie!')
                    }
                    else alert(err + ' : Could not delete cast to movie!')
                })
            }else{
                setCastId(null);
            }
        }
    }

    return (
        <div>
            <h3>Add Cast for {movie.title}</h3>
            <div className='casts'>
                casts
            {
                casts && casts.length > 0 && (
                    casts.map((cast, i) => <div key={i}>
                    <CastCard cast={cast} handleDelete = {handleDelete}/> </div>)
                )}
            </div>
            <form className='input-field'>
            <input type='text' placeholder='Enter Cast Name' onChange={handleSearch} />
            <button className='search' onClick={handleSearch}>search</button>
            </form>
            <div className='casts'>
                casts
            {
                casts && casts.length > 0 && (
                    casts.map((cast, i) => <div key={i}>
                    <Card cast={cast} handleAdd = {handleAdd}/> </div>)
                )}
            </div>

        </div>
    )

}