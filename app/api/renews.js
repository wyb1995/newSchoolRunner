import express from 'express';
import xiyouRenew from '../services/xiyou/renew';
import checkLogin from '../tool/check-login';
const router = express.Router();

router.post('/', function (req, res) {
  checkLogin(req, function (err, isLogin, next) {
    if(err) return next(err);
    if(!isLogin){
      return res.sendStatus(401);
    }
    xiyouRenew(req, function (err, result) {
      if(err) return next(err);
      if(result.body.Result === true){
        return res.json(result);
      }
      return res.sendStatus(409);
    });
  });
});

export default router;
