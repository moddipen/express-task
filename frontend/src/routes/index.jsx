import React from "react";
import { Route, Switch } from "react-router-dom";
import Students from "../components/Students";
import Projects from "../components/Projects";
import Login from "../components/Login";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Students} />
      <Route path="/projects" exact component={Projects} />
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Routes;
