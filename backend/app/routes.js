"use strict";

const Auth = require("./auth/service");

module.exports = app => {
  // auth route include
  app.use("/auth", require("./auth"));

  // student and projects routes with authorization
  app.use("/api", Auth.isAuthenticated, require("./controllers/students"));
  app.use("/api", Auth.isAuthenticated, require("./controllers/projects"));
};
