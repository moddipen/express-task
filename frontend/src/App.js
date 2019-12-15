import React from "react";
import {
  Container,
  Jumbotron,
  Nav, NavItem
} from "reactstrap";
import Routes from "./routes/index.jsx";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="app">
      <Container>
          <Jumbotron>
            <Nav>
              <NavItem>
                <Link to="/">Students</Link>
              </NavItem>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <NavItem>
                <Link to="/projects">Projects</Link>
              </NavItem>
            </Nav>
            <br />
              <Routes />
          </Jumbotron>
      </Container>
    </div>
  );
};

export default App;
