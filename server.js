var express = require("express");
const path = require('path')
//use the application off of express.
var app = express();

app.use(express.static('public'));

// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//define the route for "/"
app.get("/", function (req, res){

    res.render('index', {
      title: 'Dashboard | 3rd EYE'
    })
});

//define the route for "/"
app.get("/settings", function (req, res){

  res.render('settings', {
    title: 'settings | 3rd EYE'
  })
});

//start the server

app.listen(process.env.PORT || 8080 ,function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
      });
