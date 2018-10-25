var axios = require("axios");
var db = require("../models");

const THE_MOVIE_DB_API_KEY = process.env.THE_MOVIE_DB_API_KEY;
const SEARCH_URL = process.env.SEARCH_URL;
const SIMILAR_URL = process.env.SIMILAR_URL;
const TODAY_URL = process.env.TODAY_URL;

module.exports = function(app) {
  app.get("/search", function (req, res) {
    axios.get(SEARCH_URL + "?api_key=" + THE_MOVIE_DB_API_KEY  + "&query=" + req.query.term).then(response => {
      response.data.results.forEach(function(row) {
        db.Show.findOne({ where: {id: row.id} })
          .then(function(obj) {
            if(!obj) {
              db.Show.create({
                id: row.id,
                title: row.name,
                description: row.overview,
                image: row.poster_path,
              });
            }
          })
        });

        if (typeof req.session.userId !== 'undefined') {
          let totalNeeded = response.data.results.length;
          let totalProcessed = 0;

          response.data.results.forEach(function(row) {
            db.UserShow.findOne({ where: {userId: req.session.userId, showId: row.id} })
              .then(function(obj) {
                if(obj) {
                  row.favorite = true;
                }

                totalProcessed++;
              })
              .then(function() {
                if (totalNeeded === totalProcessed) {
                  return res.json({
                    data: response.data.results
                  });
                }
              })
          });
        } else {
          return res.json({
            data: response.data.results
          });
        }
      });
  });

  app.get("/similar", function (req, res) {
    axios.get(SIMILAR_URL + "/" + req.query.id + "/similar?api_key=" + THE_MOVIE_DB_API_KEY).then(response => {
      response.data.results.forEach(function(row) {
        db.Show.findOne({ where: {id: row.id} })
          .then(function(obj) {
            if(!obj) {
              db.Show.create({
                id: row.id,
                title: row.name,
                description: row.overview,
                image: row.poster_path,
              });
            }
          })
      });

      if (typeof req.session.userId !== 'undefined') {
        let totalNeeded = response.data.results.length;
        let totalProcessed = 0;

        response.data.results.forEach(function(row) {
          db.UserShow.findOne({ where: {userId: req.session.userId, showId: row.id} })
            .then(function(obj) {
              if(obj) {
                row.favorite = true;
              }

              totalProcessed++;
            })
            .then(function() {
              if (totalNeeded === totalProcessed) {
                return res.json({
                  data: response.data.results
                });
              }
            })
        });
      } else {
        return res.json({
          data: response.data.results
        });
      }
    });
  });

  app.get("/today", function (req, res) {
    axios.get(TODAY_URL + "?api_key=" + THE_MOVIE_DB_API_KEY).then(response => {
      response.data.results.forEach(function(row) {
        row.favorite = false;

        db.Show.findOne({ where: {id: row.id} })
          .then(function(obj) {
            if(!obj) {
              db.Show.create({
                id: row.id,
                title: row.name,
                description: row.overview,
                image: row.poster_path,
              });
            }
          })
      });

      if (typeof req.session.userId !== 'undefined') {
        let totalNeeded = response.data.results.length;
        let totalProcessed = 0;

        response.data.results.forEach(function(row) {
          db.UserShow.findOne({ where: {userId: req.session.userId, showId: row.id} })
          .then(function(obj) {
            if(obj) {
              row.favorite = true;
            }

            totalProcessed++;
          })
          .then(function() {
            if (totalNeeded === totalProcessed) {
              return res.json({
                data: response.data.results
              });
            }
          })
        });
      } else {
        return res.json({
          data: response.data.results
        });
      }
    });
  });
};