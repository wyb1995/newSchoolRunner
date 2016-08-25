'use strict';
import express from 'express';
import {User} from '../mongodb/schema';
import currentApi from './current';
import _ from 'lodash';
import xiyouLogin from '../services/xiyou/login';
import xiyouInfo from '../services/xiyou/info';
import {checkMail, checkTel} from '../../public/tool/validate';
const router = express.Router();
router.post('/', function (req, res, next) {
  const userId = getUserIdFromInfo(req);
  const email = req.body.email;
  const tel = req.body.tel;
  if (_.isEmpty(email) || _.isEmpty(tel)) {
    return res.status(400).send('数据不能为空');
  }
  const correctMail = checkMail(email);
  const correctTel = checkTel(tel);
  if (!(correctMail && correctTel)) {
    return res.status(400).send('电话号码或邮箱格式不正确');
  }
  User.findOne({userId: userId}, function (err, user) {
    if (err) return next(err);
    if (user.email) {
      return res.status(409).send('用户信息已经存在');
    }
    const password = user.password;
    xiyouLogin({userId, password}, function (err, haslogin, detail) {
      if (err) return next(err);
      if (haslogin) {
        return res.status(401).send('用户名或密码有误，登录失败');
      }
      xiyouInfo(detail, function (err, detail) {
        if (err) return next(err);
        User.update({userId: userId}, {$set: {userName: detail.Name, department: detail.Department, email: email, tel: tel}}, function (err) {
          if (err) return next(err);
          return res.status(201).send('用户信息已经存入本地数据库');
        });
      });
    });
  });
});

router.use('/current', currentApi);

function getUserIdFromInfo(req) {
  const info = req.cookies['info'];
  const separatorIndex = _.lastIndexOf(info, ':');
  return info.substring(0, separatorIndex);
}
export default router;
