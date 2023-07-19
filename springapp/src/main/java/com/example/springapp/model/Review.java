package com.example.springapp.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Review {
    

    @Id
	@GeneratedValue
	private long reviewId;
	@ManyToOne
	@JoinColumn(name="movieId")
	private Movie movie;
	// @ManyToOne
	// @JoinColumn(name = "userId")
	private long userId;
	// @Column(columnDefinition = "FLOAT(2,1) default 0.0 CHECK (rating>=0.0 AND rating <=5.0)")
	private String rating;
	private String reviewNote;
	private String source;
	@CreationTimestamp
	private Timestamp date;
	@UpdateTimestamp
	private Timestamp updateDate;
	
	
	public Review(long id, Movie movie, long userId, String rating, String source, String reviewNote, Timestamp date,
            Timestamp updateDate) {
        this.reviewId = id;
        this.movie = movie;
        this.userId = userId;
        this.rating = rating;
        this.source = source;
        this.reviewNote = reviewNote;
        this.date = date;
        this.updateDate = updateDate;
    }


    public Review() {
    }


    public long getReviewId() {
        return reviewId;
    }


    public void setReviewId(long id) {
        this.reviewId = id;
    }


    public Movie getMovie() {
        return movie;
    }


    public void setMovie(Movie movie) {
        this.movie = movie;
    }


    public long getUserId() {
        return userId;
    }


    public void setUserId(long userId) {
        this.userId = userId;
    }


    public String getRating() {
        return rating;
    }


    public void setRating(String rating) {
        this.rating = rating;
    }


    public String getSource() {
        return source;
    }


    public void setSource(String source) {
        this.source = source;
    }


    public String getReviewNote() {
        return reviewNote;
    }


    public void setReviewNote(String reviewNote) {
        this.reviewNote = reviewNote;
    }


    public Timestamp getDate() {
        return date;
    }


    public void setDate(Timestamp date) {
        this.date = date;
    }


    public Timestamp getUpdateDate() {
        return updateDate;
    }


    public void setUpdateDate(Timestamp updateDate) {
        this.updateDate = updateDate;
    }
    
	
    
    
}