import axios from "axios";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/UserContext";
import AnsQuestion from "./Pages/AnsQuestion/AnsQuestion";
import Askquestion from "./Pages/Askquestion/Askquestion";

import Footer from "./Pages/Footer/Footer";
import Header from "./Pages/Header/Header";
import Home from "./Pages/Home/Home";
import Information from "./Pages/information/Information";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
//
const apiUrl = `${process.env.REACT_APP_API_URL}/users`;
//
function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    //check if token already exists in localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      //token not in localStorage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      //if token exists in localStorage then use auth to verify token and get user info
      const userRes = await axios.get(apiUrl, {
        headers: { "x-auth-token": token },
      });

      //set the global state with user info
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }
  };

  const logout = () => {
    //set global state to undefined will logout the user
    setUserData({
      token: undefined,
      user: undefined,
    });

    //resetting localStorage
    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    //check if the user is logged in
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <Header logout={logout} />
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          {/* passing logout function as props to Home page */}
          <Route path="/" element={<Home logout={logout} />} />
          <Route path="/home" element={<Home logout={logout} />} />
          {/* Newly added routes */}
          <Route path="/information" element={<Information />} />
          <Route path="/ask" element={<Askquestion />} />
          {/* <Route path="/answers" element={<AnsQuestion />} /> */}
          <Route path={`/answer/:questionId`} element={<AnsQuestion />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
