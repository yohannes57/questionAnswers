const router = require("express").Router();

//importing auth middleware
// const auth = require("../middleware/auth");

const { createUser } = require("./User.controller");

//route new user to be registered using createUser controller
router.post("/api/users", createUser );


module.exports = router;
