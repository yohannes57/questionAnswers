const mysql = require("mysql");
require("dotenv").config();
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});
pool.getConnection((err, resuls) => {
  if (err) throw err;
  console.log("db is connected");
});

let registration = `CREATE TABLE if not exists registration(
      user_id int auto_increment,
      user_name varchar(255) not null,
      user_email varchar(255) not null,
      user_password varchar(255) not null,
      PRIMARY KEY (user_id)
  )`;

let profile = `CREATE TABLE if not exists profile(
    user_profile_id int auto_increment,
    user_id int not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    PRIMARY KEY (user_profile_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

// create question
let question = `CREATE TABLE if not exists question(
    question_id int auto_increment,
    question varchar(255) not null,
    question_description varchar(255),
    question_code_block varchar(255),
    tags varchar(255),
    post_id varchar(255) not null,
    user_id int not null,
    PRIMARY KEY (question_id),
    UNIQUE KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

// primary key is uniquer for each table
// unique key is for index(culumn) in one more than unique key
// foreign key is for table constraint

let answer = `CREATE TABLE if not exists answer(
    answer_id int auto_increment,
    answer varchar(255) not null,
    answer_code_block varchar(255),
    user_id int not null,
    question_id int not null,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id),
    FOREIGN KEY(question_id) REFERENCES question(question_id)  
    
)`;

pool.query(registration, (error, results, fields) => {
  if (error) {
    console.log("error >>>", error);
    return;
  }
  console.log("registration table created");
});
// // table profile
pool.query(profile, (err, results) => {
  if (err) throw err;
  console.log("profile table created");
});
// // table question
pool.query(question, (err, results) => {
  if (err) throw err;
  console.log("question table created");
});
// // table answer
pool.query(answer, (err, results) => {
  if (err) throw err;
  console.log("answer table created");
});

// module.exports = pool
