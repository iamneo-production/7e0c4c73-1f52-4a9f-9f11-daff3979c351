package com.example.springapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.repository.CastRepository;
import com.example.springapp.model.Cast;

@Service
public class CastService {
    
	//Cast Data access object from Dao layer
    @Autowired
	CastRepository castDao;
	
	


	//creates a cast object and adds it into the database
	public Cast addCast(String name, String poster) {
		Cast c = new Cast();
		c.setName(name);
		c.setPoster(poster);
		castDao.save(c);
		
		return c;
	}

	//gets the cast with all the cast details using the castId
	public Cast getCast(long castId) {
		
		return castDao.findById(castId).get();
		
	}

	//deletes the particular cast from the database
	public void deleteCast(Cast cast) {
		castDao.delete(cast);
	}

	//returns the list of Casts that have string key in their name
	public List<Cast> searchByCastName(String key) {
		return castDao.findByNameContaining(key);
		
	}

}