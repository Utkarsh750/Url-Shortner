const User = require("../models/users");

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
  const user = User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  res.redirect("/");
}
module.exports = {
  handleUserSignup,
  handleUserSignin,
};
