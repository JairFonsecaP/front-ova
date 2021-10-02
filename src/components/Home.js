import React from "react";
import { Switch, Route } from "react-router-dom";
import Contact from "./Contact";
import Header from "./Header";
import Landing from "./Landing";
import Footer from "./Footer";
import Nosotros from "./Nosotros";
import NotFound from "./NotFound";
import Producto from "./Producto";

function Home(props) {
  return (
    <div>
      <Header
        setToken={props.setToken}
        setUser={props.setUser}
        user={props.user}
      />
      <Switch>
        <Route path="/producto" component={Producto} />
        <Route path="/contacto" component={Contact} />
        <Route path="/nosotros" component={Nosotros} />
        <Route path="/" component={Landing} exact />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}
export default Home;
