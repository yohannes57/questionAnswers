const router = require("express").Router();
//importing auth middleware
const auth = require("../middleware/auth");
const { createUser, getUserById, login } = require("./User.controller.js");
//route new user to be registered using createUser controller
router.post("/", createUser);
//route existing user to be verified using auth middleware and getUserById
router.get("/", auth, getUserById);
//route existing user to be login using login controller
router.post("/login", login);
// New routes for questions using createQuestion controller
// router.post("/ask", createQuestion);
module.exports = router;
