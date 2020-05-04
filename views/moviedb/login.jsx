var React = require("react");

class Login extends React.Component {
  render() {
    // console.log(this.props.types);
    var showError = "d-none"
    if (this.props.error != undefined) {
      showError = "d-inline"
    }
    var loggedIn = 'invisible'
    const logo = {
      height: '70px',
      width: '70px',
      backgroundColor: 'transparent'
    };
    var logoStyle = {
      fontFamily: 'Krona One, sans-serif'
    }
    return (
      <html>
        <head>

          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"></link>
          <link href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap" rel="stylesheet" />

        </head>
        <body className="bg-dark">
          <div className="bg-dark border-bottom border-secondary">
            <nav className="navbar navbar-dark bg-dark w-75 ml-auto mr-auto pl-0 pr-0">
              <a className="navbar-brand" href="/">
                <img src="/Logo only.png" width="30" height="30" className="d-inline-block align-top" alt="">
                </img>
                &emsp;<span style={logoStyle}>Watcher</span>
              </a>
              <div className={loggedIn}>
                <a className="btn btn-outline-primary rounded-pill mr-3 pl-2 pr-2 pt-1 pb-1" href="/login">Log In</a>
                <a className="btn btn-primary rounded-pill pl-4 pr-4 pt-1 pb-1" href="/signup">Sign Up</a>
              </div>
            </nav>
          </div>
          <div className="mt-0 container-fluid bg-dark w-50 d-flex flex-column text-center p-3 border border-secondary rounded-lg">
            <img src="/Logo only.png" className="img-thumbnail border-0 ml-auto mr-auto " style={logo}></img>

            <h4 className="text-light">Log in to Watcher</h4>

            <form className="d-flex flex-column w-75 ml-auto mr-auto" method="POST" action={'/login'}>
              <input className="mt-5 pl-2 pt-2 pb-2" type="text" name="username" placeholder="Username" />
              <input className="mt-3 pl-2 pt-2 pb-2" type="password" name="password" placeholder="Password" />
              <input className="btn btn-primary rounded-pill mt-3 mb-3 pt-2 pb-2" type="submit" value="Log In" />
              <div className={`alert alert-danger ${showError}`} role="alert">
                {this.props.error}
              </div>
              <a href="/signup">No account? Sign up here</a>
            </form>
          </div>
          <footer className="page-footer font-small blue">

            <div class="footer-copyright text-center text-light py-3">Powered by :  <img src="/tmdb.svg" height="15" className="d-inline-block align-center" alt="">
            </img>

            </div>

          </footer>
          <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
          <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = Login;
