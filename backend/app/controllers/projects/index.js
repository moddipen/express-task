"use strict";

var express = require("express");
var projects = require("./controller");
var router = express.Router();

router.get("/projects", projects.getAll);
router.get(
  "/projects/search",
  projects.validate("query", "name"),
  projects.search
);
router.get("/projects/:id", projects.validate("params", "id"), projects.get);
router.post("/projects", projects.validate("project"), projects.store);
router.put(
  "/projects/:id",
  [projects.validate("params", "id"), projects.validate("project")],
  projects.update
);
router.delete(
  "/projects/:id",
  projects.validate("params", "id"),
  projects.delete
);

module.exports = router;
