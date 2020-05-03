const axios = require('axios');
const movieTrailer = require( 'movie-trailer' )

module.exports = (db) => {
  /**
   * ===========================================
   * Controller logic
   * ===========================================
   */
  const api_key = process.env.TMDB_API_KEY;
  let loadIndex = (req, res) => {
    var nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1&region=US`;
  const imgUrl = "https://image.tmdb.org/t/p/w500"
  async function fetchData(){
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
    nowPlaying.results =  await results
    console.log(results);
    res.render('./moviedb/index', nowPlaying)
  }
  fetchData();
}

let getMovie = (req, res) => {
let movie_id = req.params.id;
  var singleMovieUrl =   `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}&language=en-US`;
const imgUrl = "https://image.tmdb.org/t/p/w500"
async function fetchData(){
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
  console.log(singleMovie);
  res.render('./moviedb/movie', singleMovie)
}
fetchData();
}

   
  /**
   * ===========================================
   * Export controller functions as a module
   * ===========================================
   */
  return {
    loadIndex: loadIndex,
    getMovie: getMovie
  
  };

}
