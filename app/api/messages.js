import express from 'express';
import {User, Message} from '../mongodb/schema';
import checkLogin from '../tool/check-login';
import _ from 'lodash';

const router = express.Router();
router.get('/', function (req, res) {
  checkLogin(req, function (err, isLogin) {
    if (!isLogin) {
      return res.sendStatus(401);
    }
    Message.find(function (err, messages, next) {
      if (err) return next(err);
      console.log(messages);
      return res.json(messages);
    });
  });
});

router.post('/', function (req, res) {
  checkLogin(req, function (err, isLogin) {
    if (!isLogin) {
      return res.sendStatus(401);
    }
    const info = req.cookies['info'];
    const userId = getUserIdFromInfo(info);
    User.findOne({userId: userId}, function (err, user, next) {
      if (err) return next(err);
      const userName = user.userName;
      let day = new Date().getDate();
      let hours = new Date().getHours();
      let minutes = new Date().getMinutes();
      let seconds = new Date().getSeconds();
      const date = day + ',' + hours + ':' + minutes + ':' + seconds;
      new Message({userName: userName, message: req.body.inputMessage, date: date})
        .save(function (err, message) {
          if (err) return next(err);
          return res.status(201).json(message);
        });
    });

  });
});

function getUserIdFromInfo(info) {
  const separatorIndex = _.lastIndexOf(info, ':');
  return info.substring(0, separatorIndex);
}

export default router;
