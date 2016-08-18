'use strict';
import express from 'express';
import request from 'superagent';
import _ from 'lodash';
import User from  '../mongodb/user.js'

const router = express.Router();

router.post('/', function (req, res, next) {
  const userId = req.body.userId;
  const password = req.body.password;
  if (_.isEmpty(userId) || _.isEmpty(password)) {
    return res.status(400).json({httpCode: 400, message: "数据不能为空"});
  }
  else {
    request.get('https://api.xiyoumobile.com/xiyoulibv2/user/login')
      .send({username: userId, password: password})
      .end((err, respones) => {
        if (err) return next(err);
        var session = respones.body.Detail;
        if (session === 'ACCOUNT_ERROR') {
          /* window.location.href = "index.html";*/
          return res.status(401).json({httpCode: 401, message: "用户名或密码有误，登录失败"});
        }
        else {
          User.findOne({userId: userId}, function (err, user) {
            if (err) return next(err);
            if (user == null) {
              res.status(201).json({httpCode: 201, message: "SUCCESS", newUser: true})
            }
            else {
              res.status(201).json({httpCode: 201, message: "SUCCESS", newUser: false})
            }
          });
        }
      });
  }
});

router.get('/', function (req, res, next) {
  User.find((err, users) => {
    if (err) return next(err);
    res.json(users);
  });
});
export default router;
