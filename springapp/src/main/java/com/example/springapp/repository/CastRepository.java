package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.Cast;

@Repository
public interface CastRepository extends JpaRepository<Cast, Long> {

	List<Cast> findByNameContaining(String infix);//finds the list of casts whose names contain the string infix
	
}