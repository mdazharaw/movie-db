var React = require("react");
const sha256 = require('js-sha256');
const movieTrailer = require('movie-trailer')

class Movie extends React.Component {
  render() {
    var showLogin = 'd-inline';
    var showLogout = 'd-none';
    // console.log(this.props);
    var loginCheck = this.props.loggedIn;

    // Function to format date time value
    function formatDateTime(date) {
      var formatDate = date.toLocaleDateString();
      var formatTime = date.toLocaleTimeString();
      return `${formatDate} ${formatTime}`;
    }

    if (loginCheck == sha256('true')) {
      showLogin = 'd-none'
      showLogout = 'd-inline';
    }
    else {
      showLogin = 'd-inline'
      showLogout = 'd-none';
    }


    var movie = this.props
    let trailer = "https://www.youtube.com/embed/" + movie.trailer + "?autoplay=1&origin=http://example.com";
    // console.log(trailer);
    // movieTrailer( movie.title, movie.release_date.substring(0,3))
    // .then (response => {
    //   trailer = response;
    //   console.log(trailer)
    // });
    let runtime;
    if (movie.runtime == 0) {
      runtime = "Runtime:  Unavailable"
    }
    else {
      runtime = `Runtime: ${movie.runtime} minutes`
    }
    var logoStyle = {
      fontFamily: 'Krona One, sans-serif'
    }
    var movieOutput = <li className="row pb-5">

      <div className="col-5">
        <img className="w-75 text-center mb-3 pt-2" src={movie.poster_path} alt="" />
        {/* <img className="w-50 text-center mt-5" src={movie.backdrop_path} alt="" /> */}
        <br />
        <a className={`mt-5 mr-3 btn btn-secondary ${showLogout}`} href={`/watchlist/${movie.id}`} >Add to watchlist</a>
        <a className={`mt-5 ml-3 btn btn-secondary ${showLogout}`} href={`/community/${movie.id}`}  >Add to community list</a>


      </div>
      <div className="col-7">
        <a href={`${movie.homepage}`}><h1 className="text-light">{movie.title}</h1>
        </a>
        <p className="text-light">Released: {movie.release_date}</p>
        <p className="text-light">{runtime}</p>
        <br />
        <p className="text-light">{movie.overview}</p>
        {/* <a className="mt-5 btn btn-light" href={movie.trailer} target=" ">Watch the trailer</a> */}
        <iframe id="ytplayer" type="text/html" width="640" height="360"
          src={`${trailer}`}
          frameBorder="0"></iframe>
      </div>
    </li>;

    var reviews = this.props.reviews;
    if (reviews == null) {
      reviews = <div className="row bg-light  border-top border-bottom border-secondary pt-4 pb-4 pl-3">No reviews to display</div>
    }
    else {
      reviews = reviews.map(element => {
        return <div className="row bg-light  border-top border-bottom border-secondary pt-4 pb-4">
          {/* <div className="col-2">
          <img src="https://sociology.columbia.edu/themes/custom/columbia/assets/img/people-default.svg" className="w-100 bg-dark rounded-circle" alt="" />
        </div> */}
          <div className="col-8">
            <strong>Username: {element.username}</strong>
            <br />Rating: {element.rating}/5
            <br />Review: {element.review}
            <br />
          </div>
        </div>
      })
    }

    return (
      <html>
        <head>
    <title>Watcher: {movie.title}</title>

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
          <link href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap" rel="stylesheet" />
        </head>
        <body className="bg-dark h-100">
          <div className="bg-dark border-bottom border-secondary">
            <nav className="navbar navbar-dark bg-dark w-75 ml-auto mr-auto pl-0 pr-0">
              <a className="navbar-brand" href="/">
                <img src="/Logo only.png" width="30" height="30" className="d-inline-block align-top" alt="">
                </img>
                &emsp;<span style={logoStyle}>Watcher</span>
              </a>

              <a className={`nav-item text-light ${showLogout}`} href="/watchlist">
                <span style={logoStyle}>My Watchlist</span>
              </a>
              <a className="nav-item text-light" href="/community">
                <span style={logoStyle}>Community Lists</span>
              </a>


              <div className={showLogin}>
                <a className="btn btn-outline-primary rounded-pill mr-3 pl-4 pr-4 pt-1 pb-1" href="/login">Log In</a>
                <a className="btn btn-primary rounded-pill pl-4 pr-4 pt-1 pb-1" href="/signup">Sign Up</a>
              </div>
              <div className={showLogout}>
                <div className="text-light font-weight-bold pb-3">Logged in: {this.props.username}</div>
                <a className="btn btn-outline-primary rounded-pill  pl-4 pr-4 pt-1 pb-1" href="/logout">Log Out</a>
              </div>

            </nav>
          </div>
          <div className="container-fluid bg-dark w-75 h-100 border border-secondary mt-3 mb-5 rounded-lg">
            {movieOutput}

            <form className={showLogout} method="POST" action="/review/post">
              <div className="form-group">
                <label className="text-light" htmlFor="exampleFormControlSelect1">Rating</label>
                <select className="form-control w-25" id="exampleFormControlSelect1" name="rating">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
              <div className="form-group text-left">
                <label htmlFor="review" className="text-light">Review:</label>
                <textarea className="form-control" rows="4" name="review" placeholder="Enter review...">
                </textarea>
                <input type="hidden" name="userid" defaultValue={this.props.userid}
                />
                <input type="hidden" name="movieid" defaultValue={this.props.id}
                />
                <input className="btn btn-primary mt-3" type="submit" value="Submit" />
              </div>
            </form>
          </div>
          <div className="container bg-dark border border-top border-bottom border-secondary mt-3 rounded-lg">
            <h4 className = "text-light">Reviews: </h4>
            {reviews}
          </div>
          <footer className="page-footer font-small blue">

            <div class="footer-copyright text-center text-light py-3">Powered by :  <img src="/tmdb.svg" height="15" className="d-inline-block align-center" alt="">
            </img>

            </div>

          </footer>
          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>
          <script src="script.js"></script>
        </body>
      </html>
    );
  }
}

module.exports = Movie;
