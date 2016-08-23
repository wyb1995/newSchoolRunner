import request from 'superagent';
import logger from 'superagent-logger';
function xiyouInfo(detail, callback) {
  request.get('https://api.xiyoumobile.com/xiyoulibv2/user/info')
    .use(logger)
    .send({session: detail})
    .end((err, response) => {
      if (err)  return callback(err);
      const name = response.body.Detail.Name;
      callback(null, name);
    });
}

export default xiyouInfo;
