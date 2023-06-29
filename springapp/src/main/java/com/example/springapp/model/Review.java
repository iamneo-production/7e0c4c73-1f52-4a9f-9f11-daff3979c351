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
	private Long reviewId;
	@ManyToOne
	@JoinColumn(name="movieId")
	private Movie movie;
	private Long userId;
	private String rating;
	private String source;
	private String reviewNote;
	@CreationTimestamp
	private Timestamp date;
	@UpdateTimestamp
	private Timestamp updateDate;


    public Review(Long id, Movie movie, Long userId, String rating, String source, String reviewNote, Timestamp date,
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


    public Long getReviewId() {
        return reviewId;
    }


    public void setReviewId(Long id) {
        this.reviewId = id;
    }


    public Movie getMovie() {
        return movie;
    }


    public void setMovie(Movie movie) {
        this.movie = movie;
    }


    public Long getUserId() {
        return userId;
    }


    public void setUserId(Long userId) {
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
