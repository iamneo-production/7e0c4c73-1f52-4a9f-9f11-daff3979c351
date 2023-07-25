package com.example.springapp.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.repository.MovieRepository;
import com.example.springapp.model.Cast;
import com.example.springapp.model.Movie;
import com.example.springapp.model.WorkedOn;


@Service
public class MovieService {
    

	//Movie Data access object from Dao layer
    @Autowired
	private MovieRepository movieDao;
	
	//Other Service objects
	@Autowired
	private ReviewService reviewService;
	
	@Autowired
	private CastService castService;
	
	@Autowired
	private WorkedOnService workedOnService; 
	
	
	
	
	//returns all the movies available in the database
	public List<Movie> getMovies() {
		return movieDao.findAll();
	}


	
	
	
	//returns the particular movie having the primary key movieId
	public Movie getMovie(long movieId) {
		try {
			return movieDao.findById(movieId).get();
		}catch(Exception e) {
			return null;
		}
	}

	
	//adds the movie object received into the database
	public Movie addMovie(Movie movie) {
		movieDao.save(movie);
		return movie;
	}

	//updates the data for the movie in the database with movieId as primary key with the data in the movie object
	public Movie updateMovie(long movieId, Movie movie) {
		Movie m = movieDao.findById(movie.getMovieId()).get();
		
		if(movie.getTitle() == null) {
			movie.setTitle(m.getTitle());
		}
		if(movie.getGenre() == null) {
			movie.setGenre(m.getGenre());
		}
		if(movie.getPlotSummary() == null) movie.setPlotSummary(m.getPlotSummary());
		if(movie.getPoster() == null) movie.setPoster(m.getPoster());
		if(movie.getRating() == null || Float.parseFloat(movie.getRating()) == 0.0)movie.setRating(m.getRating());
		if(movie.getReleaseDate()==null)movie.setReleaseDate(m.getReleaseDate());
		if(movie.getCast()==null)movie.setCast(m.getCast());
		movie.setCreateDate(m.getCreateDate());
		
		movieDao.save(movie);
		return movie;
	}


	//deletes the movie with the movieId an primary key from the database
	public boolean deleteMovie(long movieId) {
		boolean success=false;
		Movie m = movieDao.findById(movieId).get();
		reviewService.deleteReviewByMovie(m);
		workedOnService.deleteByMovie(m);
		movieDao.delete(m);
		if(m!=null) success=true;
		return success;
	}


	//returns the list of all the movies that have key in its title, genre or in cast name
	public List<Movie> searchMovie(String key) {
		List<Movie> movies = movieDao.findByTitleContaining(key);
		movies.addAll(movieDao.findByGenreContaining(key));
		List<Cast> casts = castService.searchByCastName(key);
		for(Cast c : casts) {
			List<WorkedOn> wl = workedOnService.getList(c);
			for(WorkedOn w : wl) {
				movies.add(w.getMovie());
			}
		}
		Set<Long> uniqueMovieIds = new HashSet<>();
		for(Movie m : movies) {
			uniqueMovieIds.add(m.getMovieId());
		}
		
		
		return movieDao.findAllById(uniqueMovieIds);
	}


	//saves the movie to the database if previously not existed else updates it
	public void updateMovie(Movie movie) {
		movieDao.save(movie);
	}




}