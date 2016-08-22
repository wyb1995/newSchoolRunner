'use strict';
import request from 'supertest';
import app from '../../app/server';
import finish from '../finish';
import async from 'async';

describe('sessions-spec', () => {
  describe('Bad Request', ()=> {
    it('用户未输入用户名：', (done) => {
      async.waterfall([
        (cb) => request(app).post('/api/sessions').send({userId: '', password: '123456'})
          .expect(400, '数据不能为空', cb)
      ], finish(done));
    });
    it('用户未输入密码：', (done) => {
      async.waterfall([
        (cb) => request(app).post('/api/sessions').send({userId: 's03134054', password: ''})
          .expect(400, '数据不能为空', cb)
      ], finish(done));
    });
    it('用户未输入用户名和密码：', (done) => {
      async.waterfall([
        (cb) => request(app).post('/api/sessions').send({})
          .expect(400, '数据不能为空', cb)
      ], finish(done));
    });
  });
});
