package com.example.springapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entities.Movie;

public interface MovieDao extends JpaRepository<Movie, Long> {

	List<Movie> findByTitleContaining(String infix);
	List<Movie> findByGenreContaining(String genre);
	
}
