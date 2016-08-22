import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserModel = new Schema({
  userId: String,
  userName: String,
  password: String,
  tel: String,
  email: String
});
const User = mongoose.model('users', UserModel);
module.exports = {User};
