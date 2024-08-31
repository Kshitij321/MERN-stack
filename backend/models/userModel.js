const mongoose = require("mongoose");
const validator = require("validator");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 
});

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("please fill all the fields");
  const user = await this.findOne({ email });
  if (!user) throw Error("enter correct email");
  const ispassmatch = await bcrypt.compare(password, user.password);
  if (!ispassmatch) throw Error("wrong password");
  return user;
};
//static signup method
userSchema.statics.signup = async function (email, password) {
  if (!email || !password) throw Error("Please fill all the fields");
  if (!validator.isEmail(email)) throw Error("Please enter a valid email");
  if (!validator.isStrongPassword(password))
    throw Error("please enter Strong password");
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  //creating a document in the mongodb
  const user = await this.create({ email, password: hash });
  return user;
};
module.exports = mongoose.model("User", userSchema);
