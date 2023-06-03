package com.example.springapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.dao.UserDao;
import com.example.springapp.entities.User;

@Service
public class UserService {
    

    @Autowired
	private UserDao userDao;
	
	
	
	public User AuthenticateUser(String email, String password) {
		List<User> users = userDao.findByEmail(email);
		if(users.size() > 0) {
			User u = users.get(0);
			if(u.getPassword().equals(password)) return u;
		}
		return null;
	}



	public boolean createUser(String email, String password, String name, boolean isAdmin) {
		
		if(isEmailExist(email)) return false;
		
		User user = new User();
		user.setEmail(email);
		user.setPassword(password);
		user.setName(name);
		user.setAdmin(isAdmin);
		userDao.save(user);
		
		return true;
	}



	public boolean isEmailExist(String email) {
		List<User> users = userDao.findByEmail(email);
		
		if(users.size() > 0) return true;
		
		return false;
	}



	public boolean isUserAdmin(String email) {
		List<User> users = userDao.findByEmail(email);
		if(users.size() > 0) {
			User user = users.get(0);
			return user.isAdmin();
		}
		return false;
	}


    

	public User getUserByEmail(String email) {
		List<User> users = userDao.findByEmail(email);
		if(users.size() > 0) {
			return users.get(0);
		}
		return null;
	}
	


	public User getUserByUserId(long userId) {
		User user = userDao.findById(userId).get();
		return user;
	}


}
