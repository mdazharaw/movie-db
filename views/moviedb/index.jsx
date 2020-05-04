var React = require("react");
const cookieParser = require('cookie-parser');
const sha256 = require('js-sha256');
const movieTrailer = require( 'movie-trailer' )

class Home extends React.Component {
  render() {
    var logoStyle = {
      fontFamily: 'Krona One, sans-serif'
    }
    var nowShowing = this.props.results;
    nowShowing = nowShowing.map((element) => {
      // console.log(element.title)
      // console.log(element.poster_path)
      
      return <li className="row pb-5">

        <div className="col-5">
          <img className="w-75 text-center" src={element.poster_path} alt="" />
          </div>
        <div className="col-8">
          <a href={`/movies/${element.id}`}><h2 className="text-light">{element.title}</h2>
          </a>
          <p className="text-light">{element.overview}</p>
          <a href={`${element.trailer}`}>{element.trailer}</a>
          {/* <img className="w-25" src={element.backdrop_path} alt="" /> */}
        </div>

      </li>
    })
    var showLogin = 'd-inline';
    var showLogout = 'd-none';
    // console.log(this.props.types);
    
    var loginCheck = this.props.loggedIn;


    if (loginCheck == sha256('true')) {
      showLogin = 'd-none'
      showLogout = 'd-inline';
    }
    else {
      showLogin = 'd-inline'
      showLogout = 'd-none';
    }


    return (
      <html>
        <head>

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
          <link href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap" rel="stylesheet"/>

        </head>
        <body className="bg-dark">
          <div className="bg-dark border-bottom border-secondary">
            <nav className="navbar navbar-dark bg-dark w-75 ml-auto mr-auto pl-0 pr-0">
              <a className="navbar-brand" href="/">
              <img src="/Logo only.png" width="30" height="30" className="d-inline-block align-top" alt="">
                </img>
                &emsp;<span style = {logoStyle}>Watcher</span>
            </a>
              <div className={showLogin}>
                <a className="btn btn-outline-primary rounded-pill mr-3 pl-4 pr-4 pt-1 pb-1" href="/login">Log In</a>
                <a className="btn btn-primary rounded-pill pl-4 pr-4 pt-1 pb-1" href="/signup">Sign Up</a>
              </div>
              <div className={showLogout}>
                <a className="btn btn-outline-primary rounded-pill  pl-4 pr-4 pt-1 pb-1" href="/logout">Log Out</a>
              </div>

            </nav>
          </div>
          <div className="container bg-dark w-75 border border-secondary pt-3 pb-3 mt-3 mb-3 rounded-lg">
            <h3 className="text-light font-weight-light font-italic" style = {logoStyle}>Latest Movies</h3>
            <br/>
            {nowShowing}
          </div>


          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = Home;
