package com.example.springapp.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.Movie;
import com.example.springapp.model.Review;
import com.example.springapp.repository.ReviewRepository;


@Service
public class ReviewService {
    

	//Review Data access object from Dao layer
    @Autowired
	ReviewRepository reviewDao;
	
	


	//returns the Review for the primary key reviewId
	public Review getReviewById(long reviewId) {
		return reviewDao.findById(reviewId).get();
	}


	//saves the review in the database
	public Review postReview(Review review) {
		if(review.getMovie() != null && review.getUserId() != null && (review.getReviewNote().length() > 0 || Float.parseFloat(review.getRating()) >= 0.0)) {
			reviewDao.save(review);
			return review;
		}
		return null;
	}


	//returns the list of reviews posted under the particular movie
	public List<Review> getReviewByMovie(Movie movie) {
		List<Review> reviews = reviewDao.findByMovie(movie);
		// for(Review review : reviews) {
		// 	hideUserDetail(review);
		// }
		return reviews;
	}
	
	//returns the list of reviews posted by the particular user
	public List<Review> getReviewByUserId(Long userId) {
		List<Review> reviews = reviewDao.findByUserId(userId);
		// for(Review review : reviews) {
		// 	hideUserDetail(review);
		// }
		return reviews;
	}

	//deletes all the reviews posted under the movie
	@Transactional
	public long deleteReviewByMovie(Movie movie) {
		return reviewDao.deleteByMovie(movie);
	}

	//change the text or the rating of a particular review with primary key reviewId
	public Review updateReview(long reviewId,String reviewNote,String rate) {
		Review review = reviewDao.findById(reviewId).get();
		float rating = Float.parseFloat(rate);
		if(review != null) {
			if(reviewNote != null) review.setReviewNote(reviewNote);
			if(rating >= 0 && rating <= 5) review.setRating(""+rating);
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
			return review.getMovie();
		}
		return null;
	}

	//returns the average rating for the movie posted in the reviews
	public String getRating(Movie movie) {
		List<Review> reviews = reviewDao.findByMovie(movie);
		float rating=0;
		int size = 0;
		if(reviews != null && reviews.size() > 0) {
			for(Review r : reviews) {
                float rate = Float.parseFloat(r.getRating());
				if( rate >= 0 && rate <= 5) {
					rating += rate;
					size++;
				}
			}
			return ""+(rating/(float)size);
		}
		return ""+0.0f;
	}


	
}
