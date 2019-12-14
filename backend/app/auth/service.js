"use strict";

const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_SECRET_KEY;

const isAuthenticated = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, privateKey, async (err, decoded) => {
      if (err) {
        return res.send(makeError("You Are Not Authorized"));
      } else {
        next();
      }
    });
  } else {
    return res.send(makeError("You Are Not Authorized"));
  }
};

exports.isAuthenticated = isAuthenticated;
