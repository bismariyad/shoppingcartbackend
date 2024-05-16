var express = require("express");
var router = express.Router();
const users = require("../bin/database/user.json");


router.post("/login", (req, res) => {
  try {
    console.log(req.body)
    const { username, password } = req.body;
    if (!username) {
      return res.status(200).send("user missing");
    }
    if (!password) {
      return res.status(200).send("password missing");
    }
    const user = users.find((u) => u.username === username);
    if (user) {
      if (user.password === password) {
        return res.status(200).send(user.address);
      } else {
        return res.status(200).send("password incorrect");
      }
    } else {
      return res.status(200).send("user not found");
    }
  } catch (error) {
    return res.send(error.toString());
  }
});
module.exports = router;
