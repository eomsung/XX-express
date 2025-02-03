const express = require("express");
const usersRoutes = require("./users/users.route");

const router = express.Router();

router.use("/users", usersRoutes);

module.exports = router;
