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
            Nada mejor que motivar maravillosos valores humanos en los más
            pequeños con ayuda de un OVA especialmente diseñado para ellos; con
            una herramienta que además se ajuste a los estándares solicitados
            por las entidades correspondientes, como lo es la conferencia
            episcopal de Colombia; que contenga material visual interactivo,
            llamativo y completo. “El aula del maestro” es una herramienta
            completa para los docentes del área de Religión, que permite a los
            docentes repasar los temas vistos en la clase y evaluar a los
            alumnos en dichos conocimientos. Por otro lado, brinda a los
            estudiantes un espacio colorido, atractivo y cercano donde repasar
            conceptos de la clase es divertido ya que hay increíbles personajes
            que los acompañan en este maravilloso trayecto, reconociendo sus
            virtudes y falencias con los juegos evaluativos que esta herramienta
            incluye.
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
