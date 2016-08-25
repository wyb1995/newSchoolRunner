import express from 'express';
import {User, Message} from '../mongodb/schema';
import checkLogin from '../tool/check-login';
import _ from 'lodash';

const router = express.Router();
router.get('/', function (req, res) {
  checkLogin(req, function (err, isLogin, next) {
    if (err) return next(err);
    if (!isLogin) {
      return res.sendStatus(401);
    }
    Message.find(function (err, messages, next) {
      if (err) return next(err);
      return res.json(messages);
    });
  });
});

router.post('/', function (req, res) {
  checkLogin(req, function (err, isLogin, next) {
    if (err) return next(err);
    if (!isLogin) {
      return res.sendStatus(401);
    }
    if (!req.body.inputMessage) {
      return res.sendStatus(400);
    }
    const info = req.cookies['info'];
    const userId = getUserIdFromInfo(info);
    // Message.find().remove(function (err) {
    User.findOne({userId: userId}, function (err, user, next) {
      if (err) return next(err);
      const userName = user.userName;
      const day = new Date().getDate();
      const hours = new Date().getHours();
      const minutes = new Date().getMinutes();
      const seconds = new Date().getSeconds();
      const date = day + ',' + hours + ':' + minutes + ':' + seconds;
      new Message({userName: userName, message: req.body.inputMessage, date: date})
        .save(function (err, message) {
          if (err) return next(err);
          return res.status(201).json(message);
        });
    });
    // })
  });
});

function getUserIdFromInfo(info) {
  const separatorIndex = _.lastIndexOf(info, ':');
  return info.substring(0, separatorIndex);
}

export default router;
