package com.example.springapp.entities;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Movie {
    

    @Id
	@GeneratedValue
	private long movieId;
	private String title;
	@Temporal(TemporalType.DATE)
	private Date releaseDate;
	@Column(columnDefinition = "FLOAT(2,1) CHECK(rating>=0 AND rating <=5)")
	private float rating;
	private String genre;//stores the different genres separated by space
	private String description;
	private String poster;//stores the url of the poster of the movie
<<<<<<< HEAD
=======
	
	

>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
	@CreationTimestamp
	private Timestamp createDate;
	@UpdateTimestamp
	private Timestamp updateDate;
	
<<<<<<< HEAD
=======
	
	

>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032

	public Movie(long movieId, String title, Date releaseDate, float rating, String genre, String description,
			String poster,Timestamp createDate, Timestamp updateDate) {
		super();
		this.movieId = movieId;
		this.title = title;
		this.releaseDate = releaseDate;
		this.rating = rating;
		this.genre = genre;
		this.description = description;
		this.poster = poster;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}


	public Movie() {
		super();
	}


	public long getMovieId() {
		return movieId;
	}


	public void setMovieId(long movieId) {
		this.movieId = movieId;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public Date getReleaseDate() {
		return releaseDate;
	}


	public void setReleaseDate(Date releaseDate) {
		this.releaseDate = releaseDate;
	}


	public float getRating() {
		return rating;
	}


	public void setRating(float rating) {
		this.rating = rating;
	}


	public String getGenre() {
		return genre;
	}


	public void setGenre(String genre) {
		this.genre = genre;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getPoster() {
		return poster;
	}


	public void setPoster(String poster) {
		this.poster = poster;
	}


	public Timestamp getCreateDate() {
		return createDate;
	}


	public void setCreateDate(Timestamp createDate) {
		this.createDate = createDate;
	}


	public Timestamp getUpdateDate() {
		return updateDate;
	}


	public void setUpdateDate(Timestamp updateDate) {
		this.updateDate = updateDate;
	}
	
	
	public String toString() {
		return ""+this.movieId;
	}
	
	public boolean equals(Object o) {
		if(o.getClass() == this.getClass() && o.toString() == this.toString()) return true;
		return false;
	}
	

<<<<<<< HEAD
}
=======
}
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
