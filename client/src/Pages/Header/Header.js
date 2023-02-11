import React from "react";
import "./Header.css";
import logo from "../../images/Q&A-portalff.png";
import { Link } from "react-router-dom";

function Header({ logout }) {
  return (
    <div className="header">
      <nav className="header__nav">
        <div className="header__navLeft">
          <img src={logo} alt="logo" />
        </div>
        <div className="header__navRight">
          <Link to="/home" className="Link">
            <li>Home</li>
          </Link>
          <Link className="Link" to="/information">
            <li>How it Works</li>
          </Link>
          <li>
            <Link to="/home" className="Link">
              <button onClick={logout} className="header__navBtn">
                {localStorage.getItem("auth-token") ? "LogOut" : "SIGN IN"}
              </button>
            </Link>
          </li>
        </div>
      </nav>
    </div>
  );
}

export default Header;
