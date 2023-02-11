import React from "react";
import "./Footer.css";
import logoFtr from "../../images/Q&A-portalf.png";
import { FiFacebook } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineYoutube } from "react-icons/ai";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__left">
        <img src={logoFtr} alt="logo" />
        <ul className="footer__leftLogo">
          <li>
            <div className="footer__icon">
              <FiFacebook />
            </div>
          </li>
          <li>
            <div className="footer__icon">
              <BsInstagram />
            </div>
          </li>
          <li>
            <div className="footer__icon">
              <AiOutlineYoutube />
            </div>
          </li>
        </ul>
      </div>
      <div className="footer__mid">
        <h3>Useful Link</h3>
        <ul className="footer__midList">
          <li>How it Works</li>
          <li>Terms of Service</li>
          <li>Privacy Policy</li>
        </ul>
      </div>
      <div className="footer__right">
        <h3>Contact Info</h3>
        <ul className="footer__rightList">
          <li>Q&A Networks</li>
          <li>Support@yohannes7.com</li>
          <li>+1206-789-99877</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
