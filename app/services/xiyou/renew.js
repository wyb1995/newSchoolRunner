'use strict';

import request from 'superagent';

function xiyouRenew(req, callback) {
  const session = req.body.session;
  const barcode = req.body.barcode;
  const department_id = req.body.department_id;
  const library_id = req.body.library_id;

  request.get('https://api.xiyoumobile.com/xiyoulibv2/user/renew')
    .send({
      session: session,
      barcode: barcode,
      department_id: department_id,
      library_id: library_id
    })
    .end((err, res) => {
      if(err) return callback(err);
      callback(null, res);
    });
}

export default xiyouRenew;
