package com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.config.JwtTokenUtil;
import com.example.springapp.entities.User;
import com.example.springapp.services.UserService;

@RestController
public class Controller{

	//Object to connect to User service of service layer
    @Autowired
    UserService userService;

	//object to connect to JWT configuration 
    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @GetMapping("/")
    public String home(){
        return "Home";
    }


	//Signup takes data from form data like email, password, name and so on and returns a status code of 200 if successfully created
	@CrossOrigin(origins = "*")
    @PostMapping("/signup")
	public ResponseEntity<HttpStatus> signup(@RequestParam("email") String email,@RequestParam("password") String password,@RequestParam("name") String name,@RequestParam("type") String type){
		try{
			boolean isAdmin = (type.equals("admin"));
			if(this.userService.createUser(email,password,name,isAdmin))//create user returns true if successfully user is created
				return new ResponseEntity<>(HttpStatus.OK);
			else
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	//Signin takes email and password as form data and returns a String token for successful login else 401 or 500 status code
    @CrossOrigin(origins = "*")
	@PostMapping("/signin")
	public ResponseEntity<String> signIn(@RequestParam("email") String email,@RequestParam("password") String password) {
		try {
			User user = this.userService.AuthenticateUser(email, password);//userService authenticates the email and password and returns the User data
			if(user != null) {
				String token = jwtTokenUtil.generateToken(user);//JWT taken is generated using the email of the user
				return ResponseEntity.status(HttpStatus.OK).body(token);
			}
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
	}





}