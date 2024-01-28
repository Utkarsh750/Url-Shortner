const express = require("express");
const handleUserSignup = require("../controllers/user");

const router = express.Router;

router.post("/", handleUserSignup);
module.exports = router;
