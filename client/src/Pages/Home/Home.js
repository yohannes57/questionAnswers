import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Home.css";
import Question from "../Community/Question";
import axios from "axios";
import { MdArrowForwardIos } from "react-icons/md";
//
// http://localhost:4000/api/questions
const apiUrl = `${process.env.REACT_APP_API_URL}/questions`;
//
const Home = ({ logout }) => {
  const [userData, setUserData] = useContext(UserContext);
  // const [page, setPage] = useState("Home");
  const [allQuestions, setAllQuestions] = useState([]);
  // let [currrentQuestion, setCurrrentQuestion] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
    const fetchQuestions = async () => {
      let questions = await axios.get(apiUrl);
      questions = questions.data.data;
      setAllQuestions(() => {
        return questions;
      });
    };
    fetchQuestions();
  }, [userData.user, navigate]);

  return (
    <>
      <div className="home">
        <div className="home__top">
          <button
            onClick={() => {
              navigate("/ask");
            }}
            className="home_topBtn"
          >
            Ask Question
          </button>
          <h4>Welcome: {userData.user?.display_name}</h4>
        </div>
        <h3 className="home__question">Questions</h3>
        <div> {allQuestions[0]?.question_id}</div>
        <div className="home__questionLists">
          <div>
            {allQuestions?.map((question) => (
              <div key={question.question_id}>
                <Link
                  to={`/answer/${question.question_id}`}
                  state={{
                    question: question,
                    currentUserId: userData.user?.id,
                  }}
                  className="Link"
                >
                  <Question show={question} />
                  <MdArrowForwardIos className="MdArrowForwardIos" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        {allQuestions.length < 3 && (
          <div className="home__questionListsBottom" />
        )}
        <button onClick={logout}>Log out</button>
      </div>
    </>
  );
};

export default Home;
