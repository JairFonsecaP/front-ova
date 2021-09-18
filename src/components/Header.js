import React from "react";
import { Link } from "react-router-dom";
import LogoTM from "../assets/images/LogoTM.png";
import "../assets/css/header.css";

function Header() {
  return (
    <header className="header" id="header">
      <Link to="/">
        <img className="logo" src={LogoTM} alt="Logo TravelMedia" />
      </Link>
      <h1 className="titulo">EL AULA DEL MAESTRO</h1>
    </header>
  );
}

export default Header;
