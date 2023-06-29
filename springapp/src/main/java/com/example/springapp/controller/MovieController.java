package com.example.springapp.controller;

import java.io.File;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.springapp.security.JwtTokenUtil;
// import com.example.springapp.entities.Cast;
import com.example.springapp.model.Movie;
import com.example.springapp.model.Review;
import com.example.springapp.model.User;
// import com.example.springapp.entities.WorkedOn;
// import com.example.springapp.model.MovieModel;
// import com.example.springapp.services.CastService;
import com.example.springapp.service.MovieService;
import com.example.springapp.service.ReviewService;
import com.example.springapp.service.UserService;
// import com.example.springapp.services.WorkedOnService;

import io.jsonwebtoken.ExpiredJwtException;

@RestController
@RequestMapping("/api")
public class MovieController {

	// Service layer objects

	@Autowired
	UserService userService;// Object to connect to User service of service layer

	@Autowired
	private ReviewService reviewService;// Object to connect to review service of service layer

	@Autowired
	private MovieService movieService;// Object to connect to movie service of service layer

	// @Autowired
	// private CastService castService;// Object to connect to cast service of service layer

	// @Autowired
	// private WorkedOnService workedOnService;// Object to connect to workedOn service of service layer

	// object to connect to JWT configuration
	@Autowired
	JwtTokenUtil jwtTokenUtil;

	// gives a unique name to the file and stores the image file in the publicly accessable folder and returns the unique name given to the image
	private String handleFile(MultipartFile poster) throws Exception {
		String filename = poster.getOriginalFilename();// gets the original name of the file
		Timestamp timestamp = new Timestamp(System.currentTimeMillis());
		String name = filename, ext = "";
		// separating the name and the extension of the image
		for (int i = filename.length() - 1; i >= 0; i--) {
			if (filename.charAt(i) == '.') {
				name = filename.substring(0, i);
				ext = filename.substring(i);
				break;
			}
		}
		filename = name + timestamp.getTime() + ext;// creating the unique file name by adding the current timestamp
		poster.transferTo(new File(
				"\\home\\coder\\project\\workspace\\springapp\\src\\main\\resources\\static\\"
						+ filename));// storing the image to the public folder
		return filename;
	}

	// Signup takes data from form data like email, password, name and so on and returns a status code of 200 if successfully created
	@PostMapping("/signup")
	public ResponseEntity<HttpStatus> signup(@RequestParam("email") String email,
			@RequestParam("password") String password, @RequestParam("name") String name,
			@RequestParam("role") String role) {
		try {
			// boolean isAdmin = (type.equals("admin"));

			// to be updated in workspace of examly

			if ((!this.userService.isEmailExist(email)) && this.userService.createUser(email, password, name, role))// create user returns true if successfully user is created
				return new ResponseEntity<>(HttpStatus.OK);
			else
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Signin takes email and password as form data and returns a String token for successful login else 401 or 500 status code
	@PostMapping("/signin")
	public ResponseEntity<Map<String, Object>> signIn(@RequestParam("email") String email,
			@RequestParam("password") String password) {
		// userDetail = {"email":"abc@xyz.com","password":"pass"}
		try {
			User user = this.userService.AuthenticateUser(email, password);
			if (user != null) {
				String token = jwtTokenUtil.generateToken(user);
				String role = user.getRole();
				Map<String, Object> responseBody = new HashMap<>();
				responseBody.put("token", token);
				responseBody.put("email", user.getEmail());
				responseBody.put("name", user.getName());
				responseBody.put("role", role);
				responseBody.put("userId", user.getUserId());
				return ResponseEntity.ok(responseBody);
			}
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	//check if a token is valid for a particular user
	@PostMapping("/authenticate")
	public ResponseEntity<HttpStatus> authenticate(@RequestHeader(name = "Authorization") String token,
			@RequestParam("email") String email) {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					if (email.equals(jwtTokenUtil.getUsernameFromToken(token)) && userService.isEmailExist(email)) {
						if (userService.isUserAdmin(email)) {
							return new ResponseEntity<>(HttpStatus.ACCEPTED);
						}
						return new ResponseEntity<>(HttpStatus.OK);
					}
				}
			}
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (ExpiredJwtException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// tasks related to movie Service starts

	// retrieves all the movies that are present in the database
	@GetMapping("/movies")
	public ResponseEntity<List<Movie>> getMovies() {
		try {
			List<Movie> movies = this.movieService.getMovies();
			if (movies != null) {
				return ResponseEntity.status(HttpStatus.OK).body(movies);
			}
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
	@GetMapping("/movies/highestrated")
	public ResponseEntity<List<Movie>> getHighestRatedMovies(){
		try{
			List<Movie> movies = this.movieService.getHighestRatedMovies();
			return ResponseEntity.status(HttpStatus.OK).body(movies);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	@GetMapping("/movies/recent")
	public ResponseEntity<List<Movie>> getRecentMovies(){
		try{
			List<Movie> movies = this.movieService.getRecentMovies();
			return ResponseEntity.status(HttpStatus.OK).body(movies);
		}catch(Exception e){
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	// retrieves the particular movie data that has primary key as movieId
	@GetMapping("/movies/{movieId}")
	public ResponseEntity<Movie> getMovie(@PathVariable String movieId) {
		try {
			Movie m = this.movieService.getMovie(Long.parseLong(movieId));
			if (m != null) {
				// List<WorkedOn> wl = workedOnService.getList(m);
				return ResponseEntity.status(HttpStatus.OK).body(m);
			} else {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// creates a new movie object and stores the data in the database after authenticating the user as admin
	@PostMapping("/movies")
	public ResponseEntity<Movie> addMovie(@RequestHeader(name = "Authorization") String token,
			@RequestParam("title") String title, @RequestParam("genre") String genre,
			@RequestParam("releaseDate") String releaseDate, @RequestParam("plotSummary") String plotSummary,
			@RequestParam(name = "poster", required = false) MultipartFile poster) {

		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {
						Movie movie = new Movie();
						movie.setTitle(title);
						movie.setGenre(genre);
						Date releaseDate1 = new SimpleDateFormat("dd/MM/yyyy").parse(releaseDate);
						movie.setReleaseDate(releaseDate1);
						movie.setPlotSummary(plotSummary);
						String filename = handleFile(poster);
						movie.setPoster(filename);
						movie = this.movieService.addMovie(movie);
						// List<WorkedOn> wl = workedOnService.getList(movie);
						return ResponseEntity.status(HttpStatus.OK).body(movie);
					}
				}
			}
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (ExpiredJwtException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// updates the movie having movieId as the primary key in the database after authenticating the user as admin
	@PutMapping("/movies/{movieId}")
	public ResponseEntity<Movie> updateMovie(@PathVariable String movieId,
			@RequestHeader(name = "Authorization") String token,
			@RequestParam(name = "title", required = false) String title,
			@RequestParam(name = "genre", required = false) String genre,
			@RequestParam(name = "releaseDate", required = false) String releaseDate,
			@RequestParam(name = "plotSummary", required = false) String plotSummary,
			@RequestParam(name = "poster", required = false) MultipartFile poster) throws Exception {

		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {
						Movie movie = new Movie();
						movie.setMovieId(Long.parseLong(movieId));
						movie.setTitle(title);
						movie.setGenre(genre);
						Date releaseDate1 = releaseDate != null ? new SimpleDateFormat("dd/MM/yyyy").parse(releaseDate)
								: null;
						movie.setReleaseDate(releaseDate1);
						movie.setPlotSummary(plotSummary);
						String filename = (poster != null) ? handleFile(poster) : null;
						movie.setPoster(filename);
						movie = this.movieService.updateMovie(Long.parseLong(movieId), movie);
						// List<WorkedOn> wl = workedOnService.getList(movie);
						return ResponseEntity.status(HttpStatus.OK).body(movie);
					}
				}
			}
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (ExpiredJwtException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// deletes the movie having movieId as the primary key from the database after authenticating the user as admin
	@DeleteMapping("/movies/{movieId}")
	public ResponseEntity<HttpStatus> deleteMovie(@PathVariable String movieId,
			@RequestHeader(name = "Authorization") String token) {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {
						this.movieService.deleteMovie(Long.parseLong(movieId));
						return new ResponseEntity<>(HttpStatus.OK);
					}
				}
			}
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		} catch (ExpiredJwtException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// retrieves all the movies that are associated with the key like key present in the movie title, movie genre and in the cast name
	@GetMapping("/search/movies/{key}")
	public ResponseEntity<List<Movie>> searchMovie(@PathVariable String key) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(movieService.searchMovie(key));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// tasks related to review Service starts

	// retrieves the particular review data that has primary key as reviewId
	@GetMapping("/reviews/{reviewId}")
	public ResponseEntity<Review> getReview(@PathVariable String reviewId) {
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(this.reviewService.getReviewById(Long.parseLong(reviewId)));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	// posts a review and rating for a user in the review table of the database after authenticating the user
	@PostMapping("/reviews")
	public ResponseEntity<HttpStatus> postReview(@RequestHeader(name = "Authorization") String token,
			@RequestParam("reviewNote") String reviewNote, @RequestParam("rating") String rating,
			@RequestParam("movieId") long movieId) {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email)) {
						Review review = new Review();
						review.setReviewNote(reviewNote);
						review.setRating(rating);
						Movie movie = this.movieService.getMovie(movieId);
						review.setMovie(movie);
						review.setUserId(userService.getUserByEmail(email).getUserId());
						review = this.reviewService.postReview(review);
						if (review != null) {
							rating = reviewService.getRating(movie);
							movie.setRating(rating);
							movieService.updateMovie(movie);
							return new ResponseEntity<>(HttpStatus.OK);
						} else {
							throw new Exception("Could not post review");
						}

					}
				}
			}
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		} catch (ExpiredJwtException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// updates or changes the review with reviewId as the primary key after authenticating the user as admin
	@PutMapping("/reviews/{reviewId}")
	public ResponseEntity<HttpStatus> updateReview(@PathVariable String reviewId,
			@RequestHeader(name = "Authorization") String token,
			@RequestParam(name = "reviewNote", required = false) String reviewNote,
			@RequestParam(name = "rating", required = false) String rating) throws Exception {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {
						Review review = reviewService.updateReview(Long.parseLong(reviewId), reviewNote, rating);
						if (review != null) {
							Movie movie = review.getMovie();
							rating = reviewService.getRating(movie);
							movie.setRating(rating);
							movieService.updateMovie(movie);
							return new ResponseEntity<>(HttpStatus.OK);
						} else {
							return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
						}

					}
				}
			}
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (ExpiredJwtException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// deletes the review with reviewId as the primary key from the database after authenticating the user as the admin
	@DeleteMapping("/reviews/{reviewId}")
	public ResponseEntity<HttpStatus> deleteReview(@PathVariable String reviewId,
			@RequestHeader(name = "Authorization") String token) {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {
						Movie movie = reviewService.deleteReview(Long.parseLong(reviewId));
						if (movie != null) {
							String rating = reviewService.getRating(movie);
							movie.setRating(rating);
							movieService.updateMovie(movie);
							return new ResponseEntity<>(HttpStatus.OK);
						} else
							return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
					}
				}
			}
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

		} catch (ExpiredJwtException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// retrieves all the rewiews posted under the movie with the movieId as primary key
	@GetMapping("/movies/reviews/{movieId}")
	public ResponseEntity<List<Review>> getReviewByMovie(@PathVariable String movieId) {
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(reviewService.getReviewByMovie(movieService.getMovie(Long.parseLong(movieId))));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// retrieves all the rewiews posted by a user with userId as the primary key
	@GetMapping("/user/reviews/{userId}")
	public ResponseEntity<List<Review>> getReviewByUser(@PathVariable String userId) {
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(reviewService.getReviewByUserId(userService.getUserByUserId(Long.parseLong(userId)).getUserId()));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// tasks related to Cast Service starts


	//search casts using name key 
	// @GetMapping("/search/cast/{key}")
	// public List<Cast> getCasts(@PathVariable String key) {
	// 	try {
	// 		return castService.searchByCastName(key);
	// 	} catch (Exception e) {
	// 		return null;
	// 	}
	// }

	// creates a cast object with provided data and stores it in the database
	// @PostMapping("/cast")
	// public ResponseEntity<HttpStatus> addCast(@RequestHeader(name = "Authorization") String token,
	// 		@RequestParam("name") String name, @RequestParam(name = "poster", required = false) MultipartFile poster)
	// 		throws Exception {
	// 	try {
	// 		if (token != null && token.startsWith("Bearer ")) {
	// 			token = token.substring(7);
	// 			System.out.println(token);
	// 			if (!jwtTokenUtil.isTokenExpired(token)) {
	// 				String email = jwtTokenUtil.getUsernameFromToken(token);
	// 				if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {

	// 					String filename = (poster != null) ? handleFile(poster) : null;
	// 					if (castService.addCast(name, filename) != null) {
	// 						return new ResponseEntity<>(HttpStatus.OK);
	// 					}

	// 					return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	// 				}
	// 			}
	// 		}
	// 		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	// 	} catch (ExpiredJwtException e) {
	// 		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	// 	} catch (Exception e) {
	// 		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	// 	}
	// }

	// creates a worked on relation between the cast with castId and the movie with the movieId
	@PostMapping("/movies/cast")
	public ResponseEntity<HttpStatus> addCastToMovie(@RequestHeader(name = "Authorization") String token,
			/*@RequestParam("castId") Long castId, */@RequestParam("cast") String cast, @RequestParam("movieId") Long movieId) {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				System.out.println(token);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {

						// Cast cast = castService.getCast(castId);
						// Movie movie = movieService.getMovie(movieId);
						// if (cast != null && movie != null) {
						// 	if (workedOnService.addCastToMovie(movie, cast) != null)
						// 		return new ResponseEntity<>(HttpStatus.OK);
						// 	else
						// 		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
						// }
						Movie movie = movieService.getMovie(movieId);
						if (movie != null){
							if(movie.getCast() != null) movie.setCast(movie.getCast()+cast+",");
							else movie.setCast(cast+",");
							movieService.updateMovie(movie);
						}

						return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
					}
				}
			}
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (ExpiredJwtException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// deletes the cast from the database with the castId as the primary key along with all the WorkedOn relation that the cast had Worked on
	// @DeleteMapping("/cast/{castId}")
	// public ResponseEntity<HttpStatus> deleteCast(@RequestHeader(name = "Authorization") String token,
	// 		@PathVariable long castId) {
	// 	try {
	// 		if (token != null && token.startsWith("Bearer ")) {
	// 			token = token.substring(7);
	// 			System.out.println(token);
	// 			if (!jwtTokenUtil.isTokenExpired(token)) {
	// 				String email = jwtTokenUtil.getUsernameFromToken(token);
	// 				if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {
	// 					Cast cast = castService.getCast(castId);
	// 					if (cast != null) {
	// 						workedOnService.deleteByCast(cast);
	// 						castService.deleteCast(cast);
	// 						return new ResponseEntity<>(HttpStatus.OK);
	// 					}
	// 					return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	// 				}
	// 			}
	// 		}
	// 		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	// 	} catch (ExpiredJwtException e) {
	// 		return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	// 	} catch (Exception e) {
	// 		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	// 	}

	// }

	// removes the WorkedOn relation between the cast with castId and the movie with
	// movieId
	@PostMapping("/movies/remove/cast")
	public ResponseEntity<HttpStatus> removeCastToMovie(@RequestHeader(name = "Authorization") String token,
			/*@RequestParam("castId") Long castId*/@RequestParam("cast") String cast, @RequestParam("movieId") Long movieId) {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				System.out.println(token);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {
						// Cast cast = castService.getCast(castId);
						// Movie movie = movieService.getMovie(movieId);
						// if (cast != null && movie != null) {
						// 	workedOnService.deleteWorkedOn(movie, cast);
						// 	return new ResponseEntity<>(HttpStatus.OK);
						// }
						Movie movie = movieService.getMovie(movieId);
						String casts = movie.getCast();
						if(casts != null) casts.replace(cast+",", "");
						return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
					}
				}
			}
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (ExpiredJwtException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}