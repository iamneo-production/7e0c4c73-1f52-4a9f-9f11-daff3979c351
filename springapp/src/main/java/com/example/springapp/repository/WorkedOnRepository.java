package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.Cast;
import com.example.springapp.model.Movie;
import com.example.springapp.model.WorkedOn;

@Repository
public interface WorkedOnRepository extends JpaRepository<WorkedOn, Long>  {

	List<WorkedOn> findByMovie(Movie movie);//returns the list of workedOn relation for the particular movie
	List<WorkedOn> findByCast(Cast cast);//returns the list of workedOn relation on which the cast has worked on
	long deleteByMovie(Movie movie);//delete all the relations that the Movie has with any Cast
	long deleteByCast(Cast cast);//delete all the relations that the Cast has worked on any movie
	
}