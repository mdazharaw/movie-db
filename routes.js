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







};
