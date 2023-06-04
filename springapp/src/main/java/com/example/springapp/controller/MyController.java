package com.example.springapp.controller;


import java.util.*;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.entities.User;

import com.example.springapp.services.UserAuthService;


import com.example.springapp.config.JwtTokenUtil;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class MyController {
	
	@Autowired
	private UserAuthService userAuthService;	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	
	@PostMapping("/signup")
	public ResponseEntity<HttpStatus> signup(@RequestParam("email") String email,@RequestParam("password") String password,@RequestParam("name") String name,@RequestParam("type") String type){
		try{
			boolean isAdmin = (type.equals("admin"));
			boolean userExist=userAuthService.isEmailExist(email);
			if(this.userAuthService.createUser(email,password,name,isAdmin) && !userExist)
				return new ResponseEntity<>(HttpStatus.OK);
			else
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping("/signin")
	public ResponseEntity<Map<String, Object>> signIn(
	        @RequestParam("email") String email,
	        @RequestParam("password") String password
	) {
	    try {
	        User user = this.userAuthService.AuthenticateUser(email, password);
	        if (user != null) {
	            String token = jwtTokenUtil.generateToken(user);
	            boolean isAdmin = user.isAdmin(); // Assuming that the User class has a method for getting the isAdmin flag
	            Map<String, Object> responseBody = new HashMap<>();
	            responseBody.put("token", token);
	            responseBody.put("isAdmin", isAdmin);
	            return ResponseEntity.ok(responseBody);
	        }
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	    }
    }
	
}

