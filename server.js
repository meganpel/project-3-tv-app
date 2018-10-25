const express = require("express");
const bodyParser = require("body-parser");
var expressSession = require("express-session");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressSession({ secret: "secret-token", cookie: { maxAge: 31536000000 } }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(function (req, res, next) {
  var allowedOrigins = ['http://localhost:3000', 'http://tv-observer.herokuapp.com'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  next();
});

require("./routes/SearchRoutes")(app);
require("./routes/ApiRoutes")(app);
require("./routes/WatchlistRoutes")(app);

app.get('/profile', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log(`App listening on Port ${PORT}!`);
  });
});
