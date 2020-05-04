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
  let loadIndex = (req, res) => {
    var loggedIn = req.cookies['loggedIn'];
    var nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1&region=US`;
    const imgUrl = "https://image.tmdb.org/t/p/w500"
    async function fetchData() {
      let response = await axios.get(nowPlayingUrl);

      // handle success
      let nowPlaying = await response.data;
      let results = await response.data.results;
      // console.log(nowPlaying)
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
      nowPlaying.results = await results;
      nowPlaying.loggedIn = loggedIn;
      // console.log(results);
      res.render('./moviedb/index', nowPlaying)
    }
    fetchData();
  }

  let getMovie = (req, res) => {
    var loggedIn = req.cookies['loggedIn'];
    let movie_id = req.params.id;
    var singleMovieUrl = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&language=en-US`;
    const imgUrl = "https://image.tmdb.org/t/p/w500"
    async function fetchData() {
      let response = await axios.get(singleMovieUrl);

      // handle success
      let singleMovie = await response.data;
      // console.log(singleMovie)
      var posterPath = singleMovie.poster_path
      singleMovie.poster_path = imgUrl + posterPath;
      var backdrop_path = singleMovie.backdrop_path
      singleMovie.backdrop_path = imgUrl + backdrop_path;
      //   let response = await movieTrailer( singleMovie.title, singleMovie.release_date.substring(0,3))
      //   trailer = await response;
      // //  console.log(trailer);
      //  singleMovie.trailer = await trailer;

      // always executed
      // console.log(singleMovie);
      singleMovie.loggedIn = loggedIn;
      res.render('./moviedb/movie', singleMovie)
    }
    fetchData();
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
        error: 'Could not create user, please try again.'
      }
      response.render('moviedb/signup', error);
    }
    else {
      db.moviedb.signup(dataIn, (error, result) => {
        if (result == 'Could not create user, please try again') {
          var error = {
            error: 'Could not create user, please try again.'
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
        error: 'Could not login with these credentials, please try again.'
      }
      response.render('moviedb/login', error);
    }
    else {
      db.moviedb.login(dataIn, (error, result) => {
        if (result == "Could not login with these credentials, please try again") {
          var error = {
            error: 'Could not login with these credentials, please try again.'
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
    logout: logout
  };

}
