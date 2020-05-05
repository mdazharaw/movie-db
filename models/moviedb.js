/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
const sha256 = require('js-sha256');

module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope
  let signup = (dataIn, callback) => {
    var username = dataIn.username;
    var password = dataIn.password;
    var confirm = dataIn.confirm;

    password = sha256(password);
    confirm = sha256(confirm);
    if (password == confirm) {
      let query = 'INSERT INTO userdb (username,password) VALUES($1,$2) RETURNING userid';
      const values = [username, password];
      dbPoolInstance.query(query, values, (error, queryResult) => {
        if (error) {
          var errorMsg = 'Username taken, please try again.';
          // invoke callback function with results after query has executed
          console.log(error)

          callback(error, errorMsg);

        } else {

          // invoke callback function with results after query has executed
          if (queryResult.rows.length > 0) {
            // console.log(queryResult.rows);
            callback(null, queryResult.rows);
          } else {
            var errorMsg = 'Could not create user, please try again';
          // invoke callback function with results after query has executed
          callback(null, errorMsg);

          }
        }
      });
    }
    else{
        var errorMsg = 'Passwords do not match';
        // invoke callback function with results after query has executed

        callback(null, errorMsg);
    }
  };

  let login = (dataIn, callback) => {
    var username = dataIn.username;
    var password = dataIn.password;
    password = sha256(password);
    let query = 'SELECT * FROM userdb WHERE username = $1';
    const values = [username];
    dbPoolInstance.query(query, values, (error, queryResult) => {
      if (error) {
        var errorMsg = 'Invalid username, please try again.';
        console.log(error)

        // invoke callback function with results after query has executed
        callback(error, errorMsg);

      } else {

        // invoke callback function with results after query has executed
        if (queryResult.rows.length > 0) {
          console.log("logging in")
          var result = queryResult.rows[0];
          var checkPass = result.password;
          if (checkPass == password) {
            callback(null, result);
          }
          else{
            callback(null, "Invalid password, please try again");
          }
          // console.log(queryResult.rows);

        } else {
          var errorMsg = 'Invalid username, please try again.';


          // invoke callback function with results after query has executed

          callback(null, errorMsg);

        }
      }
    });


  };

  let postReview = (dataIn, callback) => {
    var userid = dataIn.userid;
    var rating = dataIn.rating;
    var review = dataIn.review;
    var movieid = dataIn.movieid;
    // console.log(Array.isArray(tags));
    
      let query = 'INSERT INTO reviewdb (userid, rating, review, movieid) VALUES ($1,$2, $3, $4) RETURNING reviewid';
      const values = [userid,rating,review,movieid];
      dbPoolInstance.query(query, values, (error, queryResult) => {
        if (error) {

          // invoke callback function with results after query has executed
          callback(error, null);

        } else {

          // invoke callback function with results after query has executed
          if (queryResult.rows.length > 0) {
              callback(null, queryResult.rows);
            
            // console.log(queryResult.rows);

          } else {
            callback(null, null);

          }
        }
      });    
  };
  let getReviews= (dataIn, callback) => {
    var movieid = dataIn.movieid
    let query
      = `SELECT * FROM userdb
      INNER JOIN reviewdb ON (userdb.userid = reviewdb.userid)   
      WHERE reviewdb.movieid = ${movieid}
      ORDER BY reviewdb.reviewid DESC
      `;
    dbPoolInstance.query(query, (error, queryResult) => {
      if (error) {

        // invoke callback function with results after query has executed
        callback(error, null);

      } else {

        // invoke callback function with results after query has executed
        if (queryResult.rows.length > 0) {
          // console.log(queryResult.rows);
          callback(null, queryResult.rows);

          // console.log(queryResult.rows);

        } else {
          callback(null, null);

        }
      }
    });
  }

  let addToWatchlist = (dataIn, callback) => {
    var userid = dataIn.userid;
    var movieid = dataIn.movieid;
    var title = dataIn.title;
    var poster = dataIn.poster;
    var plot = dataIn.plot;
    // console.log(Array.isArray(tags));
    
      let query = 'INSERT INTO watchlist (userid, movieid, title, poster, plot ) VALUES ($1,$2, $3, $4, $5) RETURNING watchlistid';
      const values = [userid, movieid, title, poster, plot];
      dbPoolInstance.query(query, values, (error, queryResult) => {
        if (error) {

          // invoke callback function with results after query has executed
          callback(error, null);

        } else {

          // invoke callback function with results after query has executed
          if (queryResult.rows.length > 0) {
              callback(null, queryResult.rows);
            
            // console.log(queryResult.rows);

          } else {
            callback(null, null);

          }
        }
      });    
  };

  let getWatchlist = (dataIn, callback) => {
    var userid = dataIn.userid;
    
    // console.log(Array.isArray(tags));
    
      let query = 'SELECT * FROM watchlist WHERE userid = $1'
      const values = [userid];
      dbPoolInstance.query(query, values, (error, queryResult) => {
        if (error) {

          // invoke callback function with results after query has executed
          callback(error, null);

        } else {

          // invoke callback function with results after query has executed
          if (queryResult.rows.length > 0) {
              callback(null, queryResult.rows);
            
            // console.log(queryResult.rows);

          } else {
            callback(null, null);

          }
        }
      });    
  };
  let removeFromWatchlist = (dataIn, callback) => {
    var userid = dataIn.userid;
    var movieid = dataIn.movieid;
    // console.log(Array.isArray(tags));
    
      let query = 'DELETE FROM watchlist WHERE userid = $1 AND movieid = $2'
      const values = [userid, movieid];
      dbPoolInstance.query(query, values, (error, queryResult) => {
        if (error) {

          // invoke callback function with results after query has executed
          callback(error, null);

        } else {

          // invoke callback function with results after query has executed
          if (queryResult.rows.length > 0) {
              callback(null, queryResult.rows);
            
            // console.log(queryResult.rows);

          } else {
            callback(null, null);

          }
        }
      });    
  };
  return {
    signup,
    login,
    postReview,
    getReviews,
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist
  };
};
