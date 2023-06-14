package com.example.springapp.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.entities.Cast;
import com.example.springapp.entities.Movie;
import com.example.springapp.entities.WorkedOn;

public interface WorkedOnDao extends JpaRepository<WorkedOn, Long>  {

	List<WorkedOn> findByMovie(Movie movie);//returns the list of workedOn relation for the particular movie
	List<WorkedOn> findByCast(Cast cast);//returns the list of workedOn relation on which the cast has worked on
	long deleteByMovie(Movie movie);//delete all the relations that the Movie has with any Cast
	long deleteByCast(Cast cast);//delete all the relations that the Cast has worked on any movie
	
}