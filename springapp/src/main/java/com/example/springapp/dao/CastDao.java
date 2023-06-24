package com.example.springapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entities.Cast;

public interface CastDao extends JpaRepository<Cast, Long> {

<<<<<<< HEAD
	List<Cast> findByNameContaining(String infix);
=======
	List<Cast> findByNameContaining(String infix);//finds the list of casts whose names contain the string infix
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
	
}
