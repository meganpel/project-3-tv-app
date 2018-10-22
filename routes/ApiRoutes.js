var db = require("../models");
var bcrypt = require("bcrypt");

module.exports = function(app) {
  app.post("/status", function(req, res) {
    if (req.session.userId === undefined) {
      return res.json({
        success: false,
      });
    }

    db.User.findOne({
      where: {
        id: req.session.userId
      }
    }).then(function(user) {
      return res.json({
        success: true,
        email: user.email
      });
    });
  });

  app.post("/login", function(req, res) {
    if (req.body.email === "") {
      return res.json({
        success: false,
        message: "Please enter an email address!"
      });
    }

    if (req.body.password === "") {
      return res.json({
        success: false,
        message: "Please enter an password!"
      });
    }

    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if (!user) {
        return res.json({
          success: false,
          message: "User not found!"
        });
      }

      bcrypt.compare(req.body.password, user.password, function(err, success) {
        if (success) {
          req.session.userId = user.id;
          return res.json({
            success: true,
            message: "User Found!",
            email: user.email,
          });
        } else {
          return res.json({
            success: false,
            message: "Invalid Password!"
          });
        }
      });
    });
  });

  app.post("/signup", function(req, res) {
    // Email validation from: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    var emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailExpression.test(String(req.body.email).toLowerCase())) {
      return res.json({
        success: false,
        message: "Please enter a valid email!"
      });
    }

    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function(user) {
      if (user) {
        return res.json({
          success: false,
          message: "Email already used!"
        });
      }

      bcrypt.hash(req.body.password, 10, function(err, hash) {
        db.User.create({
          email: req.body.email,
          password: hash
        }).then(function(user) {
          req.session.userId = user.id;

          return res.json({
            success: true,
            message: "User created!",
            email: user.email,
          });
        });
      });
    });
  });

  app.post("/logout", function(req, res) {
    req.session.userId = undefined;

    return res.json({
      success: true,
      message: "User Logged Out!",
    });
  });

};