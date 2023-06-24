package com.example.springapp.entities;

import java.sql.Timestamp;

<<<<<<< HEAD
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
=======
import javax.persistence.Column;
import javax.persistence.Entity;
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

<<<<<<< HEAD
@Entity
public class Review {

	@Id
=======
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Review {
    

    @Id
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
	@GeneratedValue
	private long reviewId;
	@ManyToOne
	@JoinColumn(name="movieId")
	private Movie movieId;
	@ManyToOne
	@JoinColumn(name = "userId")
	private User userId;
	@Column(columnDefinition = "FLOAT(2,1) default 0.0 CHECK (rating>=0.0 AND rating <=5.0)")
	private float rating;
	private String reviewText;
	@CreationTimestamp
	private Timestamp createDate;
	@UpdateTimestamp
	private Timestamp updateDate;
	
	
	public Review(long reviewId, Movie movieId, User userId, float rating, String reviewText, Timestamp createDate,
			Timestamp updateDate) {
		super();
		this.reviewId = reviewId;
		this.movieId = movieId;
		this.userId = userId;
		this.rating = rating;
		this.reviewText = reviewText;
		this.createDate = createDate;
		this.updateDate = updateDate;
	}


	public Review() {
		super();
<<<<<<< HEAD
		// TODO Auto-generated constructor stub
=======
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
	}


	public long getReviewId() {
		return reviewId;
	}


	public void setReviewId(long reviewId) {
		this.reviewId = reviewId;
	}


	public Movie getMovieId() {
		return movieId;
	}


	public void setMovieId(Movie movieId) {
		this.movieId = movieId;
	}


	public User getUserId() {
		return userId;
	}


	public void setUserId(User userId) {
		this.userId = userId;
	}


	public float getRating() {
		return rating;
	}


	public void setRating(float rating) {
		this.rating = rating;
	}


	public String getReviewText() {
		return reviewText;
	}


	public void setReviewText(String reviewText) {
		this.reviewText = reviewText;
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

<<<<<<< HEAD
=======
    
>>>>>>> 54f74e49d0d737586ab8775a47ec97a4e4abb032
}
