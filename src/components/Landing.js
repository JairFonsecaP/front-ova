import React from "react";
import { Link } from "react-router-dom";
import caricatura from "../assets/pdf/Caricatura.pdf";
import "../assets/css/landing.css";
import { Button } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import foto from "../assets/images/LogoTM.png";

function Landing() {
  return (
    <div className="landing">
      <Link to="/ova">
        <img src={foto} alt="Ova" className="ova" />
      </Link>
      <div className="copy">
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            molestiae quisquam recusandae nulla veritatis necessitatibus,
            voluptatem fuga laboriosam cumque repudiandae sit voluptatibus
            incidunt molestias ipsum iste impedit commodi maiores dolor? Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Impedit
            inventore, aliquam laborum cupiditate dolore nulla veniam minus
            minima maxime. Expedita nesciunt officiis ipsa eius tempore
            reprehenderit aut minima voluptate inventore.
          </p>
        </div>
        <a href={caricatura} download="Para pintar.pdf">
          <Button variant="contained" color="primary" startIcon={<GetApp />}>
            Descargar caricatura para pintar
          </Button>
        </a>
      </div>
    </div>
  );
}

export default Landing;
