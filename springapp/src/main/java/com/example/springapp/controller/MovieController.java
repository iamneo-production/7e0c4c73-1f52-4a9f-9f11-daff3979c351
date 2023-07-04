package com.example.springapp.controller;

import java.io.File;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import com.example.springapp.model.Cast;
import com.example.springapp.model.Movie;
import com.example.springapp.model.Review;
import com.example.springapp.model.User;
import com.example.springapp.model.WorkedOn;
import com.example.springapp.service.CastService;
import com.example.springapp.service.MovieService;
import com.example.springapp.service.ReviewService;
import com.example.springapp.service.UserService;
import com.example.springapp.service.WorkedOnService;

import io.jsonwebtoken.ExpiredJwtException;


@RestController
public class MovieController {

	// Service layer objects

	@Autowired
	private UserService userService;// Object to connect to User service of service layer

	@Autowired
	private ReviewService reviewService;// Object to connect to review service of service layer

	@Autowired
	private MovieService movieService;// Object to connect to movie service of service layer

	@Autowired
	private CastService castService;// Object to connect to cast service of service layer

	@Autowired
	private WorkedOnService workedOnService;// Object to connect to workedOn service of service layer

	@Autowired
	private MovieRepository movieRepository;
	
	// object to connect to JWT configuration
	@Autowired
	JwtTokenUtil jwtTokenUtil;

	// gives a unique name to the file and stores the image file in the publicly
	// accessable folder and returns the unique name given to the image
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
				"/home/coder/project/workspace/springapp/src/main/resources/static/"
						+ filename));// storing the image to the public folder
		return filename;
	}

	// Signup takes data from form data like email, password, name and so on and
	// returns a status code of 200 if successfully created
	@PostMapping("/signup")
	public ResponseEntity<HttpStatus> signup(@RequestParam("email") String email,
			@RequestParam("password") String password, @RequestParam("name") String name,
			@RequestParam("role") String role) {
		try {
			if (this.userService.createUser(email, password, name, role))// create user returns true if successfully
																			// user is created
				return new ResponseEntity<>(HttpStatus.OK);
			else
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Signin takes email and password as form data and returns a String token for
	// successful login else 401 or 500 status code
	@PostMapping("/signin")
	public ResponseEntity<Map<String, Object>> signIn(@RequestParam("email") String email,
			@RequestParam("password") String password) {
		try {
			User user = this.userService.AuthenticateUser(email, password);
			if (user != null) {
				String token = jwtTokenUtil.generateToken(user);
				Map<String, Object> responseBody = new HashMap<>();
				responseBody.put("token", token);
				responseBody.put("userId", user.getUserId());
				responseBody.put("email", user.getEmail());
				responseBody.put("name", user.getName());
				responseBody.put("role", user.getRole());
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
	@GetMapping("/movie")
	public ResponseEntity<List<Movie>> getMovies(@RequestParam(name = "id", required = false) String movieId) {
		try {
			List<Movie> movies = new ArrayList<>();
			if(movieId != null && movieId != ""){
				Movie m = this.movieService.getMovie(Long.parseLong(movieId));
				movies.add(m);
			}else{
				movies = this.movieService.getMovies();
			}
			if (movies != null) {
				return ResponseEntity.status(HttpStatus.OK).body(movies);
			}
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	
	// @GetMapping("/movies/highestrated")
	// public ResponseEntity<List<Movie>> getHighestRatedMovies(){
	// 	try{
	// 		List<Movie> movies = this.movieService.getHighestRatedMovies();
	// 		return ResponseEntity.status(HttpStatus.OK).body(movies);
	// 	}catch(Exception e){
	// 		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	// 	}
	// }


	// @GetMapping("/movies/recent")
	// public ResponseEntity<List<Movie>> getRecentMovies(){
	// 	try{
	// 		List<Movie> movies = this.movieService.getRecentMovies();
	// 		return ResponseEntity.status(HttpStatus.OK).body(movies);
	// 	}catch(Exception e){
	// 		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	// 	}
	// }
	

	// retrieves the particular movie data that has primary key as movieId
	// @GetMapping("/movies/{movieId}")
	// public ResponseEntity<MovieModel> getMovie(@PathVariable String movieId) {
	// 	try {
	// 		Movie m = this.movieService.getMovie(Long.parseLong(movieId));
	// 		if (m != null) {
	// 			List<WorkedOn> wl = workedOnService.getList(m);
	// 			return ResponseEntity.status(HttpStatus.OK).body(new MovieModel(m, wl));
	// 		} else {
	// 			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	// 		}
	// 	} catch (Exception e) {
	// 		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	// 	}
	// }

	// creates a new movie object and stores the data in the database after
	// authenticating the user as admin
	@PostMapping("/movie")
	public ResponseEntity<Movie> addMovie(@RequestHeader(name = "Authorization") String token,
			@RequestParam("title") String title, @RequestParam("genre") String genre,
			@RequestParam("releaseDate") String releaseDate, @RequestParam("plotSummary") String plotSummary,
			@RequestParam(name="cast", required = false) String cast,
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
						if(poster != null){
							String filename = handleFile(poster);
							movie.setPoster(filename);
						}
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
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// updates the movie having movieId as the primary key in the database after
	// authenticating the user as admin
	@PutMapping("/movie")
	public ResponseEntity<Movie> updateMovie( @RequestHeader(name = "Authorization") String token,
			@RequestParam(name = "movieId") String movieId,
			@RequestParam(name = "title", required = false) String title,
			@RequestParam(name = "genre", required = false) String genre,
			@RequestParam(name = "releaseDate", required = false) String releaseDate,
			@RequestParam(name="cast", required = false) String cast,
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

	// deletes the movie having movieId as the primary key from the database after
	// authenticating the user as admin
	@DeleteMapping("/movie")
	public ResponseEntity<HttpStatus> deleteMovie( @RequestHeader(name = "Authorization") String token,
			@RequestParam("movieId") String movieId) {
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

	// retrieves all the movies that are associated with the key like key present in
	// the movie title, movie genre and in the cast name
	@GetMapping("/search/movie/{key}")
	public ResponseEntity<List<Movie>> searchMovie(@PathVariable String key) {
		try {
			return ResponseEntity.status(HttpStatus.OK).body(movieService.searchMovie(key));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	// tasks related to review Service starts



	// retrieves the particular review data that has primary key as reviewId
	@GetMapping("/review")
	public ResponseEntity<List<Review>> getReview(@RequestParam(name = "id", required = false) String reviewId) {
		try {
			List<Review> reviews = new ArrayList<>();
			if(reviewId != null && reviewId != "") {
				reviews.add(this.reviewService.getReviewById(Long.parseLong(reviewId)));
			}else{
				reviews = this.reviewService.getAllReviews();
			}
			return ResponseEntity.status(HttpStatus.OK).body(reviews);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	// posts a review and rating for a user in the review table of the database
	// after authenticating the user
	@PostMapping("/review")
	public ResponseEntity<HttpStatus> postReview(@RequestHeader(name = "Authorization") String token,
			@RequestParam("reviewNote") String reviewNote, @RequestParam("rating") String rating,
			@RequestParam("movieId") long movieId,
			@RequestParam(name="source",required = false) String source) {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email)) {
						Review review = new Review();
						review.setReviewNote(reviewNote);
						review.setRating(rating);
						if(source != null){
							review.setSource(source);
						}
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

	// updates or changes the review with reviewId as the primary key after
	// authenticating the user as admin
	@PutMapping("/review")
	public ResponseEntity<HttpStatus> updateReview(@RequestHeader(name = "Authorization") String token,
			@RequestParam("reviewId") String reviewId,
			@RequestParam(name = "reviewNote", required = false) String reviewNote,
			@RequestParam(name = "rating", required = false) String rating,
			@RequestParam(name="source",required = false) String source) throws Exception {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {
						Review review = reviewService.updateReview(Long.parseLong(reviewId), reviewNote, rating, source);
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

	// deletes the review with reviewId as the primary key from the database after
	// authenticating the user as the admin
	@DeleteMapping("/review")
	public ResponseEntity<HttpStatus> deleteReview(@RequestParam(name = "id") String reviewId,
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
	@GetMapping("/review/movie")
	public ResponseEntity<List<Review>> getReviewByMovie(@RequestParam(name="id") String movieId) {
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(reviewService.getReviewByMovieId(movieService.getMovie(Long.parseLong(movieId))));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// retrieves all the rewiews posted by a user with userId as the primary key
	@GetMapping("/review/user")
	public ResponseEntity<List<Review>> getReviewByUser(@RequestParam(name = "id") String userId) {
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(reviewService.getReviewByUserId(Long.parseLong(userId)));
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// tasks related to Cast Service starts

	//search casts using name key 
	@GetMapping("/search/cast/{key}")
	public List<Cast> getCasts(@PathVariable String key) {
		try {
			return castService.searchByCastName(key);
		} catch (Exception e) {
			return null;
		}
	}

	// creates a cast object with provided data and stores it in the database
	@PostMapping("/cast")
	public ResponseEntity<HttpStatus> addCast(@RequestHeader(name = "Authorization") String token,
			@RequestParam("name") String name, @RequestParam(name = "poster", required = false) MultipartFile poster)
			throws Exception {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {

						String filename = (poster != null) ? handleFile(poster) : null;
						if (castService.addCast(name, filename) != null) {
							return new ResponseEntity<>(HttpStatus.OK);
						}

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

	// creates a worked on relation between the cast with castId and the movie with the movieId
	@PostMapping("/movie/cast")
	public ResponseEntity<HttpStatus> addCastToMovie(@RequestHeader(name = "Authorization") String token,
			@RequestParam("castId") Long castId, @RequestParam("movieId") Long movieId) {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {

						Cast cast = castService.getCast(castId);
						Movie movie = movieService.getMovie(movieId);
						if (cast != null && movie != null) {
							workedOnService.addCastToMovie(movie, cast);
							return new ResponseEntity<>(HttpStatus.OK);
						}

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

	// deletes the cast from the database with the castId as the primary key along
	// with all the WorkedOn relation that the cast had Worked on
	@DeleteMapping("/cast")
	public ResponseEntity<HttpStatus> deleteCast(@RequestHeader(name = "Authorization") String token,
			@RequestParam(name = "id") String castId) {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {
						Cast cast = castService.getCast(Long.parseLong(castId));
						if (cast != null) {
							workedOnService.deleteByCast(cast);
							castService.deleteCast(cast);
							return new ResponseEntity<>(HttpStatus.OK);
						}
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

	// removes the WorkedOn relation between the cast with castId and the movie with
	// movieId
	@DeleteMapping("/movie/cast")
	public ResponseEntity<HttpStatus> removeCastToMovie(@RequestHeader(name = "Authorization") String token,
			@RequestParam("castId") String castId, @RequestParam("movieId") String movieId) {
		try {
			if (token != null && token.startsWith("Bearer ")) {
				token = token.substring(7);
				if (!jwtTokenUtil.isTokenExpired(token)) {
					String email = jwtTokenUtil.getUsernameFromToken(token);
					if (userService.isEmailExist(email) && userService.isUserAdmin(email)) {
						Cast cast = castService.getCast(Long.parseLong(castId));
						Movie movie = movieService.getMovie(Long.parseLong(movieId));
						if (cast != null && movie != null) {
							workedOnService.deleteWorkedOn(movie, cast);
							return new ResponseEntity<>(HttpStatus.OK);
						}
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