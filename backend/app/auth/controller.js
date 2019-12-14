const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_SECRET_KEY;

exports.login = (req, res) => {
  jwt.sign({ id: 1 }, privateKey, { expiresIn: "24h" }, (err, token) => {
    var obj = {};
    obj.accessToken = token;
    return res.send(makeSuccess("Successfully logged in.", obj));
  });
};
