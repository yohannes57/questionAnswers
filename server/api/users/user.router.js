const router = require("express").Router();

//importing auth middleware
// const auth = require("../middleware/auth");

const { createUser, getUsers } = require("./User.controller");

//route new user to be registered using createUser controller
router.post("/", createUser);
router.get("/all", getUsers);

module.exports = router;
