const axios = require('axios');
const movieTrailer = require('movie-trailer')
const sha256 = require('js-sha256');

module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const api_key = process.env.TMDB_API_KEY;
  let loadIndex = async (req, res) => {
    var loggedIn = req.cookies['loggedIn'];
    var username = req.cookies['username'];
    var userid = req.cookies['userid'];

    var nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1&region=US`;
    const imgUrl = "https://image.tmdb.org/t/p/w500"
    let response = await axios.get(nowPlayingUrl);

      // handle success
      let dataOut = await response.data;
      let results = await response.data.results;
      // console.log(dataOut)
      results.forEach(element => {
        var posterPath = element.poster_path
        element.poster_path = imgUrl + posterPath;
        var backdrop_path = element.backdrop_path
        element.backdrop_path = imgUrl + backdrop_path;
        //   let response = await movieTrailer( element.title, element.release_date.substring(0,3))
        //   trailer = await response;
        // //  console.log(trailer);
        //  element.trailer = await trailer;
      })
      // always executed
      dataOut.results = await results;
      dataOut.loggedIn = loggedIn;
      dataOut.username = username;
      dataOut.userid = userid;

      // console.log(results);
      res.render('./moviedb/index', dataOut)
    
  }

  let getMovie = async (req, res) => {
    var loggedIn = req.cookies['loggedIn'];
    var username = req.cookies['username'];
    var userid = req.cookies['userid'];
    let movie_id = req.params.id;
    var singleMovieUrl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&language=en-US`;
    const imgUrl = "https://image.tmdb.org/t/p/w500"
    let singleMovie;
    var reviews;
    dataIn = {"movieid": movie_id}
    db.moviedb.getReviews(dataIn,(error, result) => {
      reviews = result;
    });
      try{
        let response = await axios.get(singleMovieUrl);
        singleMovie = await response.data;
        // console.log(singleMovie)
      var posterPath = singleMovie.poster_path
      singleMovie.poster_path = imgUrl + posterPath;
      var backdrop_path = singleMovie.backdrop_path
      singleMovie.backdrop_path = imgUrl + backdrop_path;
      let trailer = await movieTrailer( singleMovie.title, singleMovie.release_date.substring(0,3))
      // //  console.log(trailer);
      
      // console.log(trailer)
      trailer = trailer.split('https://www.youtube.com/watch?v=');
      // console.log(trailer[1])

      singleMovie.loggedIn = loggedIn;
      singleMovie.username = username;
      singleMovie.userid = userid;
      singleMovie.trailer = trailer[1];
      singleMovie.reviews = reviews;
      }
      catch(error){

      }
      console.log(singleMovie);
      
      res.render('./moviedb/movie', singleMovie)    
  }

  let login = (request, response) => {

    response.render('moviedb/login');
  };
  let signup = (request, response) => {

    response.render('moviedb/signup');

  };

  let signupPost = (request, response) => {
    var dataIn = request.body;
    if (dataIn.username == "" || dataIn.password == "" || dataIn.confirm == "") {
      var error = {
        error: 'Please enter the input fields correctly.'
      }
      response.render('moviedb/signup', error);
    }
    else {
      db.moviedb.signup(dataIn, (error, result) => {
        if (typeof(result) === 'string') {
          var error = {
            error: result
          }
          response.render('moviedb/signup', error);
        } else {
          var username = request.body.username;
          var userid = result[0].userid;
          response.cookie('username', username);
          response.cookie('userid', userid);
          response.cookie('loggedIn', sha256('true'));
          // var output = {'loggedIn':sha256('true')}
          response.redirect('/');
        }
      });
    }
  };

  let loginPost = (request, response) => {
    var dataIn = request.body;
    if (dataIn.username == "" || dataIn.password == "" || dataIn.confirm == "") {
      var error = {
        error: 'Please enter the input fields correctly.'
      }
      response.render('moviedb/login', error);
    }
    else {
      db.moviedb.login(dataIn, (error, result) => {
        if (typeof(result) === 'string') {
          var error = {
            error: result
          }
          response.render('moviedb/login', error);
        }
        else {
          response.cookie('username', result.username);
          response.cookie('userid', result.userid);
          response.cookie('loggedIn', sha256('true'));
          // var output = {'loggedIn':sha256('true'), 'username': result.username, 'userid': result.userid}
          response.redirect('/');
        }
      });
    }
  };

  let logout = (request, response) => {
    // var dataIn = request.body;
    // db.tweedr.login(dataIn, (error, result) => {
    //   response.cookie('username', result.username);
    //   response.cookie('userid', result.userid);
    //   response.cookie('loggedIn', sha256('true'));
    //});
    response.cookie('username', "");
    response.cookie('userid', "");
    response.cookie('loggedIn', "");
    response.redirect('/');

  };

  let postReview = async (request, response) => {
    // console.log(request.body)
    // var userid = request.cookies['userid'];
    // console.log(userid);

    var dataIn = request.body;
    // dataIn.userid = userid;
    // console.log(dataIn);

    db.moviedb.postReview(dataIn, (error, result) => {

      response.redirect(`/movies/${dataIn.movieid}`);
    });


  };
  
 
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    loadIndex: loadIndex,
    getMovie: getMovie,
    login: login,
    signup: signup,
    signupPost: signupPost,
    loginPost: loginPost,
    logout: logout,
    postReview: postReview,
  };

}
