var db = require("../models");

module.exports = function(app) {
  app.post("/watchlist/press", function (req, res) {
    db.UserShow.findOne({ where: {showId: req.body.id, userId: req.session.userId} })
      .then(function(obj) {
        if(obj) {
          db.UserShow.destroy({
            where: {
              id: obj.id,
            }
          });

          return res.json({
            favorite: false
          });
        } else {
          db.UserShow.create({
            showId: req.body.id,
            userId: req.session.userId
          });

          return res.json({
            favorite: true
          });
        }
      });
  });

  app.get("/watchlist", function (req, res) {
    db.UserShow.findAll({ where: {userId: req.session.userId} })
      .then(results => {
        let showIds = [];
        results.forEach(function(row) {
          showIds.push(row.showId);
        });

        let newShows = [];
        db.Show.findAll({ where: {id: showIds} })
          .then(shows => {
            if (shows.length === 0) {
              return res.json({
                data: newShows
              });
            } else {
              shows.forEach(function(show) {
                let newShow = {
                  id: show.id,
                  name: show.title,
                  overview: show.description,
                  poster_path: show.image,
                  favorite: true
                };

                newShows.push(newShow);
              });

              return res.json({
                data: newShows
              });
            }
          });
      });
  });


};