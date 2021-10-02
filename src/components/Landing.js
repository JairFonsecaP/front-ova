import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/landing.css";
import { Button } from "@material-ui/core";
import { GetApp } from "@material-ui/icons";
import api from "../assets/js/api";
import axios from "axios";

function Landing() {
  const download = () => {
    axios({
      url: `${api}recursos/enviar-pdf/caricatura.pdf`,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "caricatura.pdf");
      document.body.appendChild(link);
      link.click();
    });
  };
  return (
    <div className="landing">
      <Link to="/ova" className="ova">
        <img
          style={{
            padding: "5px",
            border: "solid 1px black",
            backgroundColor: "#ff1780",
          }}
          src={`${api}recursos/enviar-gif/inicio_ova.gif`}
          alt="Ova"
          className="ova"
        />
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

        <Button
          size="large"
          htmlFor="archivo-input"
          onClick={() => download()}
          variant="contained"
          color="primary"
          startIcon={<GetApp />}
          download="Para pintar.pdf"
        >
          Descargar caricatura para pintar
        </Button>
      </div>
    </div>
  );
}

export default Landing;
