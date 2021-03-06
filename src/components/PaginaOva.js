import React, { useEffect, useState } from "react";
import { Progress } from "antd";
import "../assets/css/ova.css";
import { Switch, Route } from "react-router-dom";
import PaginaUno from "./PaginaUno";
import PaginaDos from "./PaginaDos";
import PaginaTres from "./PaginaTres";
import PaginaCuatro from "./PaginaCuatro";

const PaginaOva = () => {
  const [estudiante, setEstudiante] = useState({});
  const [progreso, setProgreso] = useState(0);
  const init = () => {
    setEstudiante(JSON.parse(sessionStorage.getItem("estudiante")));
  };
  const sumarProgreso = () => {
    setProgreso(progreso < 100 ? progreso + 25 : 100);
  };
  const restarProgreso = () => {
    setProgreso(progreso > 0 ? progreso - 25 : 0);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ height: "100vh", backgroundColor: "#26447f" }}>
      <h1 style={{ color: "#fff", textAlign: "center", padding: "10px" }}>
        Hola {estudiante.nombre}
      </h1>
      <div className="progreso">
        <Progress
          style={{ margin: 0, padding: 0 }}
          percent={progreso}
          showInfo={false}
          status="active"
          strokeColor="#ff1780"
          size="x-large"
        />
      </div>

      <Switch>
        <Route path="/ova/presentacion/uno" exact>
          <PaginaUno
            setProgreso={setProgreso}
            sumarProgreso={sumarProgreso}
            restarProgreso={restarProgreso}
          />
        </Route>
        <Route path="/ova/presentacion/dos" exact>
          <PaginaDos
            sumarProgreso={sumarProgreso}
            restarProgreso={restarProgreso}
          />
        </Route>
        <Route path="/ova/presentacion/tres" exact>
          <PaginaTres
            sumarProgreso={sumarProgreso}
            restarProgreso={restarProgreso}
          />
        </Route>
        <Route path="/ova/presentacion/cuatro" exact>
          <PaginaCuatro
            sumarProgreso={sumarProgreso}
            restarProgreso={restarProgreso}
          />
        </Route>
      </Switch>
    </div>
  );
};
export default PaginaOva;
