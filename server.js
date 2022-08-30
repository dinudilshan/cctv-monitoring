var express = require("express");
 
//use the application off of express.
var app = express();

//define the route for "/"
app.get("/", function (request, response){
    //show this file when the "/" is requested
    response.sendFile(__dirname+"/views/index.html");
});

//start the server
// app.listen(process.env.PORT || 8080, function(){
//     console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//   });
//   server.connection({
//     port: process.env.PORT || 3000 
// });
app.listen(process.env.PORT || 5000 ,function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      });
// console.log("Something awesome to happen at http://localhost:8080");