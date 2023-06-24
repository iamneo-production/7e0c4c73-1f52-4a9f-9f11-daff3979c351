package com.example.springapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entities.Movie;
import com.example.springapp.entities.Review;
import com.example.springapp.entities.User;

public interface ReviewDao extends JpaRepository<Review, Long>{
	
<<<<<<< HEAD
	List<Review> findByMovieId(Movie movieId);
	List<Review> findByUserId(User userId);
	long deleteByMovieId(Movie movieId);
=======
	List<Review> findByMovieId(Movie movieId);//returns list of reviews for the particular movie
	List<Review> findByUserId(User userId);//returns list of reviews posted by a user
	long deleteByMovieId(Movie movieId);//delete all the reviews associated with the movie
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
	
	
	
}
