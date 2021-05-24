import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagramSquare,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import "../assets/css/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <a href="https://www.instagram.com" rel="noreferrer" target="_blank">
        <FontAwesomeIcon icon={faInstagramSquare} className="boton-footer" />
      </a>
      <a href="https://www.facebook.com" rel="noreferrer" target="_blank">
        <FontAwesomeIcon icon={faFacebook} className="boton-footer" />
      </a>
      <a href="https://www.linkedin.com" rel="noreferrer" target="_blank">
        <FontAwesomeIcon icon={faLinkedin} className="boton-footer" />
      </a>
      <a href="https://www.youtube.com" rel="noreferrer" target="_blank">
        <FontAwesomeIcon icon={faYoutube} className="boton-footer" />
      </a>
      <Link to="/contacto">
        <FontAwesomeIcon icon={faAt} className="boton-footer" />
      </Link>
      <Link to="/nosotros" className="boton-footer">
        ¿Quienes somos?
      </Link>
      <Link to="/producto" className="boton-footer">
        Nuestro producto
      </Link>
    </footer>
  );
}
export default Footer;
