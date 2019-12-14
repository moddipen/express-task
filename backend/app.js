const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Require routes
require("./app/routes.js")(app);

//Serves resources from public folder
app.use(express.static("public"));

// Include Helper Functions
require("./app/helper/common");

// connection port set
app.listen(process.env.PORT, () => {
  console.log("Server is listening on port " + process.env.PORT);
});
