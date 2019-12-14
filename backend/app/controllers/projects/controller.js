"use strict";

let db = require("../../../db.json");
const { body, param, query, validationResult } = require("express-validator");
const fs = require("fs");

exports.getAll = async (req, res) => {
  res.json(makeSuccess("", db.projects));
};

exports.get = async (req, res) => {
  let projects = db.projects;
  let project = projects.filter(project => project.id == req.params.id)[0];
  if (!project) {
    res.json(makeError("Record not found!"));
    return;
  }
  res.json(makeSuccess("", project || {}));
};

exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let projects = db.projects;
  let object = req.body;
  object.createdAt = Date.now();
  object.id = generateId(projects);
  projects.push(object);
  let newDb = db;
  newDb.projects = projects;
  let jsonString = JSON.stringify(newDb);
  fs.writeFile("./db.json", jsonString, err => {
    if (err) {
      res.json(makeError("Unable to add!"));
      console.log("Error writing file", err);
    } else {
      res.json(makeSuccess("Added", jsonString || {}));
    }
  });
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let projects = db.projects;
  let object = req.body;
  object.id = parseInt(req.params.id);
  let newDb = db;
  newDb.projects = updateObjectByKey(projects, object, "id");
  let jsonString = JSON.stringify(newDb);
  fs.writeFile("./db.json", jsonString, err => {
    if (err) {
      res.json(makeError("Unable to update!"));
    } else {
      res.json(makeSuccess("updated", object || {}));
    }
  });
};

exports.delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let projects = db.projects;
  let newDb = db;
  newDb.projects = projects.filter(project => project.id != req.params.id);
  let jsonString = JSON.stringify(newDb);
  fs.writeFile("./db.json", jsonString, err => {
    if (err) {
      res.json(makeError("Unable to Delete!"));
    } else {
      res.json(makeSuccess("Deleted", jsonString || {}));
    }
  });
};

exports.search = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let projects = db.projects;
  projects = await projects.filter(project =>
    project.name.includes(req.query.name)
  );
  res.json(makeSuccess("", projects || []));
};

exports.validate = (method, key = null) => {
  switch (method) {
    case "project": {
      return [
        body("name", "Name is required").exists(),
        body("description", "Description is required").exists(),
        body("studentId", "Student id is required").exists(),
        body("repoUrl", "Repository url is required").exists(),
        body("liveUrl", "Live url is required").exists()
      ];
    }
    case "params": {
      return [param(key, key + " is required").exists()];
    }
    case "query": {
      return [query(key, key + " is required").exists()];
    }
  }
};
