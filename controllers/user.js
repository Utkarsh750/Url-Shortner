const { v4: uuidv4 } = require("uuid");
const User = require("../models/users");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.render("/");
}

async function handleUserSignin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  const sessionId = uuidv4;
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  res.redirect("/");
}
module.exports = {
  handleUserSignup,
  handleUserSignin,
};
