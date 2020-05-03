// what to do when we recieve the request
var responseHandler = function() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
  };
  
  // make a new request
  var request = new XMLHttpRequest();
  
  // listen for the request response
  request.addEventListener("load", responseHandler);
  
  // ready the system by calling open, and specifying the url
  var url = "http://127.0.0.1:3000/favourite";
  
  request.open("POST", url);
  
  // send the request
  request.send();