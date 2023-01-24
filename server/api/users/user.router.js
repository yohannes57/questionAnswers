const router = require("express").Router();

//importing auth middleware
const auth = require("../middleware/auth");

const { createUser, getUserById, login, getUsers } = require("./User.controller");

//route new user to be registered using createUser controller
router.post("/", createUser);
router.get("/all", getUsers);
router.get("/",auth, getUserById); 
router.post("/login", login);

module.exports = router;
