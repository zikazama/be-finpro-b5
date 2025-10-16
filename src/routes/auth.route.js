const express = require('express')
const router = express.Router()
const { login, register } = require('../services/auth.service')

router.post("/login", login);
router.post("/register", register);

router.get("/profile", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  if (
    token !==
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
  ) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  res.status(200).json({
    status: "success",
    message: "Profile user",
    data: {
      id: 1,
      name: "Sinau",
      email: "sinau@mail.com",
    },
  });
});

module.exports = router
