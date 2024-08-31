const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
//login
const handlelogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createtoken(user._id);
    res.status(200).json({email, token});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//signup
const createtoken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: "3d" });
};


const handlesignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createtoken(user._id);
    res.status(200).json({ email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = { handlelogin, handlesignup };
