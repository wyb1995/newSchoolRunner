import request from 'superagent';
import logger from 'superagent-logger';
function xiyouInfo(detail, callback) {
  request.get('http://api.xiyoumobile.com/xiyoulibv2/user/info')
    .use(logger)
    .send({session: detail})
    .end((err, response) => {
      if (err)  return callback(err);
      callback(null, response.body.Detail.Name);
    });
}

export default xiyouInfo;
