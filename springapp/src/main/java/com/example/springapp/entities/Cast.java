package com.example.springapp.entities;

import java.util.*;

import javax.persistence.*;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Cast {

	@Id
	@GeneratedValue
	private long castId;
	
	private String name;
	private String poster;
	
	@ElementCollection
	private Set<Long> movieIds;
	
	public Cast(long castId, String name, String poster, Set<Long> movies) {
		super();
		this.castId = castId;
		this.name = name;
		this.poster = poster;
		this.movieIds = movies;
	}


	public Cast() {
		super();
		
	}


	public long getCastId() {
		return castId;
	}


	public void setCastId(long castId) {
		this.castId = castId;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getPoster() {
		return poster;
	}


	public void setPoster(String poster) {
		this.poster = poster;
	}


	public Set<Long> getMovieIds() {
		return movieIds;
	}


	public void setMovieIds(Set<Long> movies) {
		this.movieIds = movies;
	}
		
	
}
