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
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  next();
});


require("./routes/ApiRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3test");

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log(`App listening on Port ${PORT}!`);
  });
});