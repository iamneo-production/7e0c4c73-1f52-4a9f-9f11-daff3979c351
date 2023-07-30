package com.example.springapp.service;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import com.example.springapp.repository.CastRepository;
import com.example.springapp.model.Cast;

import org.springframework.transaction.annotation.Transactional;

@Service
public class CastService {
    
	//Cast Data access object from Dao layer
    @Autowired
	CastRepository castDao;

	@Autowired
	ImageService imageService;
	
	


	//creates a cast object and adds it into the database
	public Cast addCast(String name, String filename,MultipartFile poster) throws IOException {
		Cast c = new Cast();
		c.setName(name);
		c.setPoster(filename);
		castDao.save(c);
		if(filename != null) imageService.storeImage(filename, poster);
		
		return c;
	}

	//gets the cast with all the cast details using the castId
	public Cast getCast(long castId) {
		
		return castDao.findById(castId).get();
		
	}

	//deletes the particular cast from the database
	@Transactional
	public void deleteCast(Cast cast) {
		imageService.deleteImage(cast.getPoster());
		castDao.delete(cast);
	}

	//returns the list of Casts that have string key in their name
	public List<Cast> searchByCastName(String key) {
		return castDao.findByNameContaining(key);
		
	}

}