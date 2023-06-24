package com.example.springapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entities.Movie;

public interface MovieDao extends JpaRepository<Movie, Long> {

<<<<<<< HEAD
	List<Movie> findByTitleContaining(String infix);
	List<Movie> findByGenreContaining(String genre);
=======
	List<Movie> findByTitleContaining(String infix);//returns list of movies that contain the string infix in its title
	List<Movie> findByGenreContaining(String genre);//returns list of movies that contain the string genre in its genre column
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
	
}
