import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';



export const NavBar = (props) => {

  const [key,setKey] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSearch = (e) => {
    e.preventDefault();
    if(key && (key.trim() != '')){
      window.location.href =  process.env.REACT_APP_FRONTEND_URL+'search/'+key;
    }
  }

  
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">MovieReviewAggregator</Navbar.Brand>

          {
            props.removeSearchBar == null && (
              <>
              <form onSubmit={handleSearch} className={'d-flex'} >
                <input type='text' placeholder='Search Movies' value={key} onChange={(e)=>setKey(e.target.value)} required />
                <button type='submit' >Search</button>
              </form>
              </>
            )
          }

          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {
              user && user.name && (
                <NavDropdown title={user.name} id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                  {
                    user.role && user.role == 'ADMIN' && (
                      <>
                        <NavDropdown.Item href="/createmovie">Create New Movie</NavDropdown.Item>
                        <NavDropdown.Item href="/createcast">Create New Cast</NavDropdown.Item>
                      </>
                    )
                  }

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#" onClick={(e) => {
                    localStorage.clear();
                    window.location.href = process.env.REACT_APP_FRONTEND_URL + 'signin';
                  }}>
                    LogOut
                  </NavDropdown.Item>
                </NavDropdown>
              )
            }
            {
              (user == null || user.name == null) && (
                <Navbar.Text href="/signin"><a href='/signin' >SignIn</a></Navbar.Text>
              )
            }

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )

}