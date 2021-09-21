import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import InicioOva from "./InicioOva";
import Juego from "./Juego";
import JuegoPerdido from "./JuegoPerdido";
import NotFound from "./NotFound";
import PaginaOva from "./PaginaOva";
import Resultado from "./Resultado";

const Ova = () => {
  return (
    <Switch>
      <Route path="/ova" component={InicioOva} exact />
      {sessionStorage.getItem("estudiante") ? (
        <>
          <Route path="/ova/presentacion" component={PaginaOva} />
          <Route path="/ova/juego" exact component={Juego} />
          <Route
            path="/ova/juego/juego-perdido"
            exact
            component={JuegoPerdido}
          />
          <Route path="/ova/juego/resultado" exact component={Resultado} />
        </>
      ) : (
        <Redirect to="/ova" exact />
      )}
      <Route component={NotFound} />
    </Switch>
  );
};
export default Ova;
