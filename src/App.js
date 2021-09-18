import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Ova from "./components/Ova";
import Login from "./components/Login";
import { isExpired, decodeToken } from "react-jwt";
import PrivateRouter from "./components/PrivateRouter";

function App() {
  const [token, setToken] = useState(undefined);
  const [user, setUser] = useState(undefined);

  const init = () => {
    const toke = sessionStorage.getItem("token");
    const myDecodedToken = decodeToken(toke);
    const isMyTokenExpired = isExpired(toke);
    if (!isMyTokenExpired && myDecodedToken) {
      setUser(myDecodedToken);
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken(null);
      setUser(undefined);
      sessionStorage.removeItem("token");
    }
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    init();
  }, [token]);
  return (
    <div className="App">
      <Switch>
        <Route path="/dashboard">
          <PrivateRouter
            token={token}
            setToken={setToken}
            setUser={setUser}
            user={user}
          />
        </Route>
        <Route path="/login">
          {!user ? (
            <Login
              token={token}
              setToken={setToken}
              setUser={setUser}
              user={user}
            />
          ) : (
            <Redirect to="/dashboard/contacto" />
          )}
        </Route>
        <Route path="/ova" component={Ova} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
