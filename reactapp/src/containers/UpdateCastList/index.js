import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Card } from '../../Components/CastCard2';
import './updatecast.css'
import { NavBar } from '../../Components/Navbar';

export const UpdateCastList = (props) => {

    var { movieId } = useParams();

    const [movie, setMovie] = useState({'title':''});
    const [cast, setCast] = useState(null);
    const [movieCasts, setMovieCasts] = useState([]);
    const [searchWord, setSearchWord] = useState('');
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
                    axios.get(process.env.REACT_APP_BACKEND_URL+'movie?id=' + movieId).then((response) => {
                        setMovie(...response.data);
                    }).catch((err)=>{
                        alert("Could not fetch movie details");
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
        handleSubmit(cast);
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



    const handleSubmit = (cast) => {
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
                    alert("Cast Added successfully");
                    setInterval(()=>{
                        window.location.reload();
                    },500);
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
                alert("Cast removed from movie Successsfully");
                setInterval(()=>{
                    window.location.reload();
                },500);
            }
            else if(response.status == 401){
                alert("Authentication Failed Please Sign in again");
            }
            else{
                alert("Could not remove Cast from movie! Please try again later");
            }
        }).catch((err)=>{
            console.log(err);
            alert("Could not remove Cast from movie! Please try again later");
        })
    }

    return (
        <>
        <NavBar/>
        <div className='ctn'>
            
            <div className='left-ctn'>
            <h3 className='m-title'>Movie Casts for {movie.title}</h3>
            <div className='c-box'>
                {
                    (movieCasts && movieCasts.length > 0) ? <> {movieCasts.map((cast,index)=>{
                        return(
                            <div className='castCard' key={index}>
                                <Card cast={cast} />
                                <button onClick={(e)=>handleDelete(cast.castId)} className='remove-btn'>Remove</button>
                            </div>
                        );
                    }) }</> : <div className='msg' >No Casts were added to the Movie {movie.title}</div>
                }
                </div>
            </div>
            
            <div className='mid'></div>
            <div className='right-ctn'>
            <h3 className='info'>Add Cast for {movie.title}</h3>
            <input className = "search" type='text'  placeholder = "Enter Cast Name"onChange={(e)=>{
                setSearchWord(e.target.value);
            }} />
            <div className='c-names'>
            {
                casts && casts.length > 0 && (
                    casts.map((cast, i) => <div key={i} onClick={(e) => {
                        setCast(cast);
                    }} ><Card cast={cast} /> </div>)
                )
            }
            </div>
            </div>
        </div>
        </>
    )

}