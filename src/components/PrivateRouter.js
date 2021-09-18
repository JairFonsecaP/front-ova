import React from "react";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";

const PrivateRouter = (props) => {
  if (props.user) {
    return (
      <>
        <Route path="/dashboard">
          <Dashboard
            token={props.token}
            setToken={props.setToken}
            setUser={props.setUser}
            user={props.user}
          />
        </Route>
      </>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRouter;
