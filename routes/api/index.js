const router = require("express").Router();
const TVController = require("../../controllers/TV-Controller");

router.route("/")
  .get(TVController.findAll)
  .post(TVController.create);

router
  .route("/:id")
  .get(TVController.findById)
  .put(TVController.update)
  .delete(TVController.remove);

module.exports = router;
