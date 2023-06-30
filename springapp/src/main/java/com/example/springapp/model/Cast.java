package com.example.springapp.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Cast {
    @Id
	@GeneratedValue
	private long castId;
	
	private String name;
	private String poster;//stores the Image URL for the Cast
	

	public Cast(long castId, String name, String poster) {
		super();
		this.castId = castId;
		this.name = name;
		this.poster = poster;
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


}
