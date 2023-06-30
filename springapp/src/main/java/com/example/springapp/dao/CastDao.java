package com.example.springapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entities.Cast;

public interface CastDao extends JpaRepository<Cast, Long> {

	List<Cast> findByNameContaining(String infix);//finds the list of casts whose names contain the string infix
	
}
