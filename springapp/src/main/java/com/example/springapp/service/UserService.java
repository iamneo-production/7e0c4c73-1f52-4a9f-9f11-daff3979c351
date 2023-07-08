package com.example.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.repository.UserRepository;
import com.example.springapp.model.User;

@Service
public class UserService {
    

	//User Data access object from Dao layer
    @Autowired
	private UserRepository userDao;
	
	
	//checks if email exists and that user has given password and if exists returns the user data
	public User AuthenticateUser(String email, String password) {
		List<User> users = userDao.findByEmail(email);
		if(users.size() > 0) {
			User u = users.get(0);
			if(u.getPassword().equals(password)){
				u.setPassword(null);
				return u;
			}
		}
		return null;
	}



	//creates a user and saves the data in the database
	public boolean createUser(String email, String password, String name, String role) {
		
		if(isEmailExist(email)) return false;
		
		User user = new User();
		user.setEmail(email);
		user.setPassword(password);
		user.setName(name);
		if(role.equals("ADMIN")){
            user.setRole("ADMIN");
        }else{
            user.setRole("USER");
        }
		userDao.save(user);
		
		return true;
	}



	//checks if given email is present in the database
	public boolean isEmailExist(String email) {
		List<User> users = userDao.findByEmail(email);
		
		if(users.size() > 0) return true;
		
		return false;
	}



	//checks if the user with given email is an admin or not
	public boolean isUserAdmin(String email) {
		List<User> users = userDao.findByEmail(email);
		if(users.size() > 0 && users.get(0).getRole().equals("ADMIN")) {
			return true;
		}
		return false;
	}


    

	//returns the data of the user by the email
	public User getUserByEmail(String email) {
		List<User> users = userDao.findByEmail(email);
		if(users.size() > 0) {
			User user =  users.get(0);
            // user.setPassword(null);
            return user;
		}
		return null;
	}
	


	//returns the data of the user by the userId
	public User getUserByUserId(Long userId) {
		User user =  userDao.findById(userId).get();
        user.setPassword(null);
        return user;
	}


}
