package com.example.springapp.model;

<<<<<<< HEAD
import java.util.*;

import javax.persistence.*;
=======
import javax.persistence.Entity;
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Cast {
<<<<<<< HEAD

	@Id
=======
    @Id
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
	@GeneratedValue
	private long castId;
	
	private String name;
<<<<<<< HEAD
	private String poster;
	
	@ElementCollection
	private Set<Long> movieIds;
	
	public Cast(long castId, String name, String poster, Set<Long> movies) {
=======
	private String poster;//stores the Image URL for the Cast
	

	public Cast(long castId, String name, String poster) {
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
		super();
		this.castId = castId;
		this.name = name;
		this.poster = poster;
<<<<<<< HEAD
		this.movieIds = movies;
=======
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
	}


	public Cast() {
		super();
<<<<<<< HEAD
		
=======
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
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


<<<<<<< HEAD
	public Set<Long> getMovieIds() {
		return movieIds;
	}


	public void setMovieIds(Set<Long> movies) {
		this.movieIds = movies;
	}
		
	
=======
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
}
