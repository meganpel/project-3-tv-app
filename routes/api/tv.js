const router = require("express").Router();
const TVRoutes = require("./tv");

router.use("/tv", TVRoutes);

module.exports = router;