import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserModel = new Schema({
  userId: String,
  userName: String,
  password: String,
  tel: String,
  email: String,
  readerType: String
});

const messageModel = new Schema({
  userId: String,
  userName: String,
  message: String,
  date: String
});
const User = mongoose.model('users', UserModel);

const Message = mongoose.model('messages', messageModel);
module.exports = {User,Message};
