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
  
  return {
    signup,
    login
  };
};
