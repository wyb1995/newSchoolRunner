import express from 'express';
import {User} from '../mongodb/schema';
import _ from 'lodash';
import checkLogin from '../tool/check-login';
import {checkMail, checkTel} from '../../public/tool/validate';


const router = express.Router();

router.get('/', function (req, res) {
  checkLogin(req, function (err, isLogin, next) {
    if(err) return next(err);
    if (!isLogin) {
      return res.sendStatus(401);
    }
    const info = req.cookies['info'];
    const userId = getUserIdFromInfo(info);
    User.findOne({userId: userId}, function (err, user, next) {
      if (err) return next(err);
      const userName = user.userName;
      const department = user.department;
      const email = user.email;
      const tel = user.tel;
      const readerType = user.readerType;
      return res.send({userName, userId, email, tel, department, readerType});
    });
  });
});

router.post('/', function (req, res) {
  checkLogin(req, function (err, isLogin, next) {
    if(err) return next(err);
    if(!isLogin){
      return res.sendStatus(401);
    }
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
    const info = req.cookies['info'];
    const userId = getUserIdFromInfo(info);
    User.update({userId: userId}, {$set: {email: email, tel: tel}}, function (err) {
      if (err) return next(err);
      return res.status(201).send('用户信息已经存入本地数据库');
    });
  });
});

function getUserIdFromInfo(info) {
  const separatorIndex = _.lastIndexOf(info, ':');
  return info.substring(0, separatorIndex);
}

export default router;
