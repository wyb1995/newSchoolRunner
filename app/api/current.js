import express from 'express';
import {User} from '../mongodb/schema';
import _ from 'lodash';
import checkLogin from '../tool/check-login';

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
      return res.send(userName);
    });
  });
});

function getUserIdFromInfo(info) {
  const separatorIndex = _.lastIndexOf(info, ':');
  return info.substring(0, separatorIndex);
}

export default router;
