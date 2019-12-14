"use strict";

const db = require("../../../db.json");
const { body, param, validationResult } = require("express-validator");
const fs = require("fs");

exports.getAll = async (req, res) => {
  res.json(makeSuccess("", db.students));
};

exports.get = async (req, res) => {
  let students = db.students;
  let student = students.filter(student => student.id == req.params.id)[0];
  if (!student) {
    res.json(makeError("Record not found!"));
    return;
  }
  res.json(makeSuccess("", student || {}));
};

exports.store = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let students = db.students;
  let student = students.filter(student => student.email == req.body.email)[0];
  if (student) {
    res.json(makeError("Email already registered!"));
    return;
  }
  let object = req.body;
  object.createdAt = Date.now();
  object.id = generateId(students);
  students.push(object);
  let newDb = db;
  newDb.students = students;
  let jsonString = JSON.stringify(newDb);
  fs.writeFile("./db.json", jsonString, err => {
    if (err) {
      res.json(makeError("Unable to add!"));
      console.log("Error writing file", err);
    } else {
      res.json(makeSuccess("Added", newDb.students || {}));
    }
  });
};

exports.update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let students = db.students;
  let student = students.filter(
    student => student.email == req.body.email && student.id != req.params.id
  )[0];
  if (student) {
    res.json(makeError("Email already registered!"));
    return;
  }
  let object = req.body;
  object.id = parseInt(req.params.id);
  let newDb = db;
  newDb.students = updateObjectByKey(students, object, "id");
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

  let students = db.students;
  let newDb = db;
  newDb.students = students.filter(student => student.id != req.params.id);
  let jsonString = JSON.stringify(newDb);
  fs.writeFile("./db.json", jsonString, err => {
    if (err) {
      res.json(makeError("Unable to Delete!"));
    } else {
      res.json(makeSuccess("Deleted", newDb.students || {}));
    }
  });
};

exports.projects = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let projects = db.projects;
  projects = await projects.filter(
    project => project.studentId == req.params.id
  );
  res.json(makeSuccess("", projects || {}));
};

exports.uploadProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  let students = db.students;
  let student = students.filter(student => student.id == req.params.id)[0];
  if (!student) {
    res.json(makeError("Record not found!"));
    return;
  }

  student.profile = "images/" + req.file.filename;
  let newDb = db;
  newDb.students = updateObjectByKey(students, student, "id");
  let jsonString = JSON.stringify(newDb);
  fs.writeFile("./db.json", jsonString, err => {
    if (err) {
      res.json(makeError("Unable to upload profile!"));
    } else {
      res.json(makeSuccess("Uploaded", newDb.students || {}));
    }
  });
};

exports.validate = (method, key = null) => {
  switch (method) {
    case "student": {
      return [
        body("name", "Name is required").exists(),
        body("surname", "surname is required").exists(),
        body("dob", "Date of birth is required").exists(),
        body("email", "Invalid email")
          .exists()
          .isEmail()
      ];
    }
    case "params": {
      return [param(key, key + " is required").exists()];
    }
  }
};
