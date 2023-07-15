package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

	List<Movie> findByTitleContaining(String infix);//returns list of movies that contain the string infix in its title
	List<Movie> findByGenreContaining(String genre);//returns list of movies that contain the string genre in its genre column
	List<Movie> findByCastContaining(String cast);//returns list of movies that contain the string genre in its genre column
	
}
