package com.example.springapp.model;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
	private String rating;
	private String cast;
	private String genre;//stores the different genres separated by space
	private String plotSummary;
	private String poster;//stores the Image URL for the Cast
    @OneToMany
    @JoinColumn(name="id",nullable = false)
    private List<Review> reviews;
	
	

	@CreationTimestamp
	private Timestamp createDate;
	@UpdateTimestamp
	private Timestamp updateDate;
	
	
	public Movie(Long id, String title, Date releaseDate, String rating, String cast, String genre, String plotSummary,
            String poster, List<Review> reviews, Timestamp createDate, Timestamp updateDate) {
        this.movieId = id;
        this.title = title;
        this.releaseDate = releaseDate;
        this.rating = rating;
        this.cast = cast;
        this.genre = genre;
        this.plotSummary = plotSummary;
        this.poster = poster;
        this.reviews = reviews;
        this.createDate = createDate;
        this.updateDate = updateDate;
    }


    public Movie() {
    }


    public Long getMovieId() {
        return movieId;
    }


    public void setMovieId(Long id) {
        this.movieId = id;
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


    public String getRating() {
        return rating;
    }


    public void setRating(String rating) {
        this.rating = rating;
    }


    public String getCast() {
        return cast;
    }


    public void setCast(String cast) {
        this.cast = cast;
    }


    public String getGenre() {
        return genre;
    }


    public void setGenre(String genre) {
        this.genre = genre;
    }


    public String getPlotSummary() {
        return plotSummary;
    }


    public void setPlotSummary(String plotSummary) {
        this.plotSummary = plotSummary;
    }


    public String getPoster() {
        return poster;
    }


    public void setPoster(String poster) {
        this.poster = poster;
    }


    public List<Review> getReviews() {
        return reviews;
    }


    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
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
	

}
