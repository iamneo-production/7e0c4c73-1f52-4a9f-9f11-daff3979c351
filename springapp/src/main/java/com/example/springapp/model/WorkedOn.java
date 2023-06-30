package com.example.springapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class WorkedOn {

    
    @Id
	@GeneratedValue
	private long workedOnId;
	
	@ManyToOne
	@JoinColumn(name="movieId")
	private Movie movie;
	@ManyToOne
	@JoinColumn(name="castId")
	private Cast cast;
	public WorkedOn(long workedOnId, Movie movieId, Cast castId) {
		super();
		this.workedOnId = workedOnId;
		this.movie = movieId;
		this.cast = castId;
	}
	public WorkedOn() {
		super();
	}
	public long getWorkedOnId() {
		return workedOnId;
	}
	public void setWorkedOnId(long workedOnId) {
		this.workedOnId = workedOnId;
	}
	public Movie getMovie() {
		return movie;
	}
	public void setMovie(Movie movieId) {
		this.movie = movieId;
	}
	public Cast getCast() {
		return cast;
	}
	public void setCast(Cast castId) {
		this.cast = castId;
	}
	
	
}
