import mongoose from'mongoose';
module.exports = {
  connect: function () {
    mongoose.connect('mongodb://localhost/newSchoolRunner');
  },
  close: function () {
    mongoose.connection.close();
  }
};
