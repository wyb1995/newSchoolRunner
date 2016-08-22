import request from 'superagent';
import logger from 'superagent-logger';
import nock from 'nock';
function xiyouLogin({userId, password}, callback) {
  request.get('https://api.xiyoumobile.com/xiyoulibv2/user/login')
    .use(logger)
    .send({username: userId, password: password})
    .end((err, response) => {
      if (err) return callback(err);
      const detail = response.body.Detail;
      const loginfail = detail === 'ACCOUNT_ERROR';
      callback(null, loginfail, detail, userId);
    });
}
export default xiyouLogin;
