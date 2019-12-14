"use strict";

const express = require("express");
const auth = require("./controller");
const router = express.Router();

router.post("/login", auth.login);

module.exports = router;
