package com.example.springapp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.dao.WorkedOnDao;
import com.example.springapp.entities.Cast;
import com.example.springapp.entities.Movie;
import com.example.springapp.entities.WorkedOn;


@Service
public class WorkedOnService {
    
	//WOrked on Data access object from Dao layer
    @Autowired
	private WorkedOnDao workedOnDao;
	
	
	
	//returns all the worked on relation with cast for the movie
	public List<WorkedOn> getList(Movie movie){
		return workedOnDao.findByMovie(movie);
	}
	
	//returns all the worked on relation with movie that the cast has worked on
	public List<WorkedOn> getList(Cast cast){
		return workedOnDao.findByCast(cast);
	}
	
	//delete all the relation for the movie
	public void deleteByMovie(Movie movie) {
		workedOnDao.deleteByMovie(movie);
	}
	
	//delete all the relation that the cast has worked on
	public void deleteByCast(Cast cast) {
		List<WorkedOn> wl = getList(cast);
		workedOnDao.deleteAll(wl);
	}

	//adds the realtion between the movie and the cast
	public WorkedOn addCastToMovie(Movie movie, Cast cast) {
		WorkedOn w = new WorkedOn();
		w.setCast(cast);
		w.setMovie(movie);
		
		workedOnDao.save(w);
		return w;
	}
	
	//removes the worked on realtion between the movie and the cast
	public void deleteWorkedOn(Movie m, Cast c) {
		List<WorkedOn> ws = workedOnDao.findByMovie(m);
		for(WorkedOn w : ws) {
			if(w.getCast().getCastId() == c.getCastId()) {
				workedOnDao.delete(w);
			}
		}
	}



}
