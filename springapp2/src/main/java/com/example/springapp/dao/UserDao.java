package com.example.springapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entities.User;

public interface UserDao extends JpaRepository<User, Long>{

	List<User> findByEmail(String email);//selects the rows that have email in the Email column
}
