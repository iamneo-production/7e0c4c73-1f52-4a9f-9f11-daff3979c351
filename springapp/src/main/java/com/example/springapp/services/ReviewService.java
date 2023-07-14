package com.example.springapp.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.dao.ReviewDao;
import com.example.springapp.entities.Movie;
import com.example.springapp.entities.Review;
import com.example.springapp.entities.User;

@Service
public class ReviewService {
    

	//Review Data access object from Dao layer
    @Autowired
	ReviewDao reviewDao;
	
	//makes the email and password data in the user present in review null so that when sent to frontend no confidential data is sent
	private Review hideUserDetail(Review review) {
		review.setUserId(review.getUserId().hideDetails());
		return review;
	}


	//returns the Review for the primary key reviewId
	public Review getReviewById(long reviewId) {
		return hideUserDetail(reviewDao.findById(reviewId).get());
	}


	//saves the review in the database
	public Review postReview(Review review) {
		if(review.getMovieId() != null && review.getUserId() != null && (review.getReviewText().length() > 0 || review.getRating() > 0.0)) {
			reviewDao.save(review);
			return review;
		}
		return null;
	}


	//returns the list of reviews posted under the particular movie
	public List<Review> getReviewByMovieId(Movie movie) {
		List<Review> reviews = reviewDao.findByMovieId(movie);
		for(Review review : reviews) {
			hideUserDetail(review);
		}
		return reviews;
	}
	
	//returns the list of reviews posted by the particular user
	public List<Review> getReviewByUserId(User user) {
		List<Review> reviews = reviewDao.findByUserId(user);
		for(Review review : reviews) {
			hideUserDetail(review);
		}
		return reviews;
	}

	//deletes all the reviews posted under the movie
	@Transactional
	public long deleteReviewByMovieId(Movie movie) {
		return reviewDao.deleteByMovieId(movie);
	}

	//change the text or the rating of a particular review with primary key reviewId
	public Review updateReview(long reviewId,String reviewText,float rating) {
		Review review = reviewDao.findById(reviewId).get();
		if(review != null) {
			if(reviewText != null) review.setReviewText(reviewText);
			if(rating > 0) review.setRating(rating);
			reviewDao.save(review);
			return review;
		}
		return null;
	}

	//delete the review with primary key an reviewId
	public Movie deleteReview(long reviewId) {
		Review review = reviewDao.findById(reviewId).get();
		if(review != null) {
			// System.out.println(review.getUserId().getEmail());
			reviewDao.deleteById(reviewId);
			return review.getMovieId();
		}
		return null;
	}

	//returns the average rating for the movie posted in the reviews
	public float getRating(Movie movie) {
		List<Review> reviews = reviewDao.findByMovieId(movie);
		float rating=0;
		int size = 0;
		if(reviews != null && reviews.size() > 0) {
			for(Review r : reviews) {
				if(r.getRating() > 0) {
					rating += r.getRating();
					size++;
				}
			}
			return rating/(float)size;
		}
		return 0.0f;
	}


	
}
