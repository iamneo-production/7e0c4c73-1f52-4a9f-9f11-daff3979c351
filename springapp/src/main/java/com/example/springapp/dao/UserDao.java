package com.example.springapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entities.User;

public interface UserDao extends JpaRepository<User, Long>{

<<<<<<< HEAD
	List<User> findByEmail(String email);
=======
	List<User> findByEmail(String email);//selects the rows that have email in the Email column
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
}
