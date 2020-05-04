module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR MOVIEDB CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const movieDbCallbacks = require('./controllers/moviedb')(allModels);

  app.get('/', movieDbCallbacks.loadIndex);
  app.get('/movies/:id', movieDbCallbacks.getMovie);
  app.get('/login', movieDbCallbacks.login);
  app.get('/signup', movieDbCallbacks.signup);
  app.post('/signup', movieDbCallbacks.signupPost);
  app.post('/login', movieDbCallbacks.loginPost);
  app.get('/logout', movieDbCallbacks.logout);
  app.post('/review/post', movieDbCallbacks.postReview);
  app.get('/watchlist', movieDbCallbacks.loadWatchlist);
  app.post('/search', movieDbCallbacks.searchDb);





};
