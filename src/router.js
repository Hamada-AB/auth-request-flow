const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const mockUser = {
  username: "authguy",
  password: "mypassword",
  profile: {
    firstName: "Chris",
    lastName: "Wolstenholme",
    age: 43,
  },
};

const payload = { username: mockUser.username };

router.post("/login", (req, res) => {
  //requirement 1
  // const token = jwt.sign(payload, process.env.JWT_SECRET);
  // res.status(201).json({ token });

  // requirement 3
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username and password are required" });
  }

  if (username !== mockUser.username || password !== mockUser.password) {
    return res
      .status(401)
      .json({ message: "username or password is incorrect" });
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.status(200).json({ token });
});

router.get("/profile", (req, res) => {
  // here we use 'extractToken' middleware that we created in server.js
  if (!req.token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(req.token, process.env.JWT_SECRET, (error) => {
    if (error) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    res.json({ profile: mockUser.profile });
  });
});

module.exports = router;
