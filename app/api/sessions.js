'use strict';
import express from 'express';
import _ from 'lodash';
import sha1 from 'sha1';
import {User} from '../mongodb/schema';
import xiyouLogin from '../services/xiyou/login';
const router = express.Router();

router.post('/', function (req, res, next) {
  const userId = req.body.userId;
  const password = req.body.password;
  if (_.isEmpty(userId) || _.isEmpty(password)) {
    return res.status(400).send('数据不能为空');
  }
  xiyouLogin({userId, password}, function (err, haslogin, detail, userId) {
    if (err) return next(err);
    if (haslogin) {
      return res.status(401).send('用户名或密码有误，登录失败');
    }
    User.findOne({userId: userId}, function (err, user) {
      if (err) return next(err);
      res.cookie('info', generateInfo(userId, password),{maxAge: 60 * 10000});
      if (!user) {
        new User({userId: userId, password: password}).save(function (err) {
          if (err) return next(err);
        });
        return res.status(201).json({message: 'SUCCESS', newUser: true});
      } else if (!user.email) {
        User.update({userId: userId}, {$set: {password: password}}, function (err) {
          if (err) return next(err);
        });
        return res.status(201).json({message: 'SUCCESS', newUser: true});
      }
      return res.status(201).json({message: 'SUCCESS', newUser: false});
    });
  });
});
function generateInfo(userId, password) {
  return userId + ':' + sha1(password);
}
export default router;
