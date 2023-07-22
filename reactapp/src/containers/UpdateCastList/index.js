import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { CastCard } from '../../Components/CastCard/index';
import {Card} from '../../Components/CastCard/index2'

export const UpdateCastList = (props) => {

    var { movieId } = useParams();

    const [movie, setMovie] = useState({'title':''});
    const [cast, setCast] = useState('');
    const [movieCasts, setMovieCasts] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [casts, setCasts] = useState([]);
    const [message, setMessage] = useState(null);

    

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
                    axios.get(process.env.REACT_APP_BACKEND_URL+'movie?id=' + movieId).then((response) => {
                        setMovie(...response.data);
                    }).catch((err)=>{
                        setMessage("Could not fetch movie details");
                    })
                    axios.get(process.env.REACT_APP_BACKEND_URL+'cast/movie?id='+movieId).then((response)=>{
                        if(response.status==200){
                            setMovieCasts(response.data);
                        }
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


    useEffect(()=>{
        handleSearch();
    },[searchWord])

    useEffect(()=>{
        handleAdd(cast);
    },[cast])

    const handleSearch = (e) => { 
        if (searchWord && searchWord.trim() != '') {
            axios.get(process.env.REACT_APP_BACKEND_URL+'search/cast/' + searchWord).then((response) => {
                setCasts([...response.data]);
            }).catch((err) => {
                setCasts([]);
            })
        }
    }



    const handleAdd = (cast) => {
        if (cast != null && cast.castId != null && movieId != null) {
            if (window.confirm('Are you sure You want to add ' + cast.name + ' to ' + movie.title)) {
                const formdata = new FormData();
                formdata.append('castId', cast.castId);
                formdata.append('movieId', movieId);
                const token = window.localStorage.getItem('token');
                axios.post(process.env.REACT_APP_BACKEND_URL+'movie/cast', formdata, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((e) => {
                    // window.location.href = process.env.REACT_APP_FRONTEND_URL+'movie/' + movieId;
                    setMessage("Cast Added successfully");
                    setInterval(()=>{
                        window.location.reload();
                    },1000);
                }).catch((err) => {
                    if(err.response.status == 400){
                        alert(err + ' : Cast already added to movie!')
                    }
                    else alert(err + ' : Could not add cast to movie!')
                })
            }else{
                setCast(null);
            }
        }
        else{
            console.log('castId is null');
        }
    }


    const handleDelete = (castId) => {
        axios.delete(process.env.REACT_APP_BACKEND_URL + 'movie/cast?castId='+castId + '&movieId='+movieId,{
            headers : {
                'Authorization' : `Bearer ${window.localStorage.getItem('token')}`
            }
        }).then((response)=>{
            if(response.status == 200){
                setMessage("Cast removed from movie Successsfully");
                setInterval(()=>{
                    window.location.reload();
                },1000);
            }
            else if(response.status == 401){
                setMessage("Authentication Failed Please Sign in again");
            }
            else{
                setMessage("Could not remove Cast from movie! Please try again later");
            }
        }).catch((err)=>{
            console.log(err);
            setMessage("Could not remove Cast from movie! Please try again later");
        })
    }

    return (
        <div>
            <h3>Movie Casts</h3>
            <div className='castsContainer'>
                {
                    movieCasts && movieCasts.map((cast,index)=>{
                        return(
                            <div className='castCard' key={index}>
                                <CastCard cast={cast} handleDelete={handleDelete} />
                                
                            </div>
                        );
                    })
                }
            </div>
            {
                message && <h3>{message}</h3>
            }
            <h3>Add Cast for {movie.title}</h3>
            <input type='text' onChange={(e)=>{
                setSearchWord(e.target.value);
            }} />
            <div>
                casts
            {
                casts && casts.length > 0 && (
                    casts.map((cast, i) => <div key={i} onClick={(e) => {
                        setCast(cast);
                    }} ><Card cast={cast} handleAdd={handleAdd}/> </div>)
                )
            }
            </div>
        </div>
    )

}