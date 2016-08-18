import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  userId: String,
  password: String,
  tel: String,
  email: String
});
const Users = mongoose.model('users', User);
module.exports = Users;
