import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Ova from "./components/Ova";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/ova" component={Ova} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
