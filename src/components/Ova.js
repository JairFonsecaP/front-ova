import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import InicioOva from "./InicioOva";
import Juego from "./Juego";
import NotFound from "./NotFound";
import PaginaUno from "./PaginaUno";
import Resultado from "./Resultado";

const Ova = () => {
  return (
    <Switch>
      <Route path="/ova" component={InicioOva} exact />
      {sessionStorage.getItem("estudiante") ? (
        <>
          <Route path="/ova/uno" exact component={PaginaUno} />
          <Route path="/ova/juego" exact component={Juego} />
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
