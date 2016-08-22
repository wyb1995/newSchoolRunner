'use strict';
import express from 'express';
import sha1 from 'sha1';
import {User} from '../mongodb/schema';
import _ from 'lodash';

const router = express.Router();

router.get('/', function (req, res) {
  const startPosition = req.headers.cookie.indexOf('info') + 5;
  const length = req.headers.cookie.length;
  const infos = req.headers.cookie.substring(startPosition, length);
  const arr = infos.split('%3A');
  const info = arr[0] + ':' + arr[1];
  if (info === null || info.length === 0 || !info.includes(':')) {
    return false;
  }
  const userId = getUserIdFromInfo(info);
  findUser(userId, function (user) {
    if (user) {
      const password = user.password;
      return generateInfo(userId, password) === info ? res.sendStatus(201) : res.sendStatus(401);
    }
  });
});

function findUser(userId, callback) {
  User.findOne({userId: userId}, function (err, user, next) {
    if (err) return next(err);
    callback(null, user);
  });
}

function getUserIdFromInfo(info) {
  const separatorIndex = _.lastIndexOf(info, ':');
  return info.substring(0, separatorIndex);
}
function generateInfo(userId, password) {
  return userId + ':' + sha1(password);
}

export default router;
