package com.example.springapp.services;

import java.util.List;

import com.example.springapp.entities.User;

public interface UserAuthService {
	
	public User AuthenticateUser(String email, String password);
	
	public boolean createUser(String email,String password,String name,boolean isAdmin);
	
	public boolean isEmailExist(String email);
	
	public User getUserByEmail(String email);
	public User getUserByUserId(long userId);
	
	public boolean isUserAdmin(String email);

		public List<User> getUsers();

	
}
