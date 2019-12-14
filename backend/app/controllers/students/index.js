"use strict";

const express = require("express");
const students = require("./controller");
const router = express.Router();
const upload = require("../../helper/upload");

router.get("/students", students.getAll);
router.get("/students/:id", students.validate("params", "id"), students.get);
router.get(
  "/students/projects/:id",
  students.validate("params", "id"),
  students.projects
);
router.post("/students", students.validate("student"), students.store);
router.put(
  "/students/:id",
  [students.validate("params", "id"), students.validate("student")],
  students.update
);
router.delete(
  "/students/:id",
  students.validate("params", "id"),
  students.delete
);
router.put(
  "/students/profile/:id",
  [upload.single("profile"), students.validate("params", "id")],
  students.uploadProfile
);

module.exports = router;
