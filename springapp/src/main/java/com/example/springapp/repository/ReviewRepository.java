package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Movie;
import com.example.springapp.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{
	
	List<Review> findByMovie(Movie movie);//returns list of reviews for the particular movie
	List<Review> findByUserId(Long userId);//returns list of reviews posted by a user
	long deleteByMovie(Movie movie);//delete all the reviews associated with the movie
	
	
	
}
