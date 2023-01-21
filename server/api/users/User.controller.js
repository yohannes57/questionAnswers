const { register, profile, getAllUsers } = require("./User.service");

//Importing bcryptJs module to use password encryption
const bcrypt = require("bcryptjs");
//Importing database structure
// const pool = require( "../config/Database" );
const pool = require("../../config/database");
//exporting all methods
module.exports = {
  createUser: (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;

    //validation
    if (!userName || !firstName || !lastName || !email || !password)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters!" });
    pool.query(
      "SELECT * FROM registration WHERE user_email = ?",
      [email],
      (err, results) => {
        if (err) {
          return res.status(err).json({ msg: "database connection err" });
        }
        if (results.length > 0) {
          return res
            .status(400)
            .json({ msg: "An account with this email already exists!" });
        } else {
          //password encryption
          const salt = bcrypt.genSaltSync();

          //changing the value of password from req.body with the encrypted password
          req.body.password = bcrypt.hashSync(password, salt);

          //sending data to register
          register(req.body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ msg: "database connection err" });
            }
            //before registration finish, we need to get the user_id from the database accessing through email
            pool.query(
              "SELECT * FROM registration WHERE user_email = ?",
              [email],
              (err, results) => {
                if (err) {
                  return res
                    .status(err)
                    .json({ msg: "database connection err" });
                }

                //adding user_id to req.body
                req.body.userId = results[0].user_id;

                //sending data to profile with the user_id included in req.body
                profile(req.body, (err, results) => {
                  if (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .json({ msg: "database connection err" });
                  }
                  return res.status(200).json({
                    msg: "New user added successfully",
                    data: results,
                  });
                });
              }
            );
          });
        }
      }
    );
  },
  getUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "db connection me" });
      }
      return res.status(200).json({ data: results });
    });
  },
};
