const express = require("express");
const accountsRoutes = require("./accounts/accounts.routes");
const tweetsRoutes = require("./tweets/tweets.routes");
const followingsRoutes = require("./followings/followings.route");
const router = express.Router();

router.use("/accounts", accountsRoutes);
router.use("/tweets", tweetsRoutes);
router.use("/followings", followingsRoutes);
module.exports = router;
