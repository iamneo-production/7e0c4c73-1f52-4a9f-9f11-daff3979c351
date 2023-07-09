package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

	List<User> findByEmail(String email);//selects the rows that have email in the Email column
}
