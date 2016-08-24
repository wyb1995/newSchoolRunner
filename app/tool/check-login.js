'use strict';
import sha1 from 'sha1';
import {User} from '../mongodb/schema';
import _ from 'lodash';

function checkLogin(req, callback) {
  const info = req.cookies['info'];
  if (info === null || info.length === 0 || !info.includes(':')) {
    callback(null, false);
  }
  const userId = getUserIdFromInfo(info);
  User.findOne({userId: userId}, function (err, user, next) {
    if (err) return next(err);
    if(user){
      const password = user.password;
      callback(null, generateInfo(userId, password) === info);
    }
  });
}
function getUserIdFromInfo(info) {
  const separatorIndex = _.lastIndexOf(info, ':');
  return info.substring(0, separatorIndex);
}
function generateInfo(userId, password) {
  return userId + ':' + sha1(password);
}

export default checkLogin;
