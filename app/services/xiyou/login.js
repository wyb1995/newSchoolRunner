import request from 'superagent';
import logger from 'superagent-logger';
function xiyouLogin({userId, password}, callback) {
  request.get('https://api.xiyoumobile.com/xiyoulibv2/user/login')
    .use(logger)
    .send({username: userId, password: password})
    .end((err, response) => {
      if (err) return callback(err);
      const detail = response.body.Detail;
      const loginSuccessfully = detail === 'ACCOUNT_ERROR';
      callback(null, loginSuccessfully, detail, userId);
    });
}
export default xiyouLogin;
