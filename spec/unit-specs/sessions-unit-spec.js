'use strict';
import request from 'supertest';
import app from '../../app/server';
import finish from '../finish';
import async from 'async';
import {User} from '../../app/mongodb/schema';
import db from '../../app/mongodb/db';
import nock from 'nock';

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
  describe('sessions-nock-spec', () => {

    beforeEach(() => {
      nock.cleanAll();
    });
    beforeEach((done)=> {
      async.series([
        (cb) => db.connect('test', cb),
        (cb) => User.find().remove(cb)
      ], finish(done));
    });

    afterEach((done)=> {
      db.close(finish(done));
    });
    it('用户输入的ID与密码全都正确，并且是第一次登录：', (done) => {
      nock("https://api.xiyoumobile.com/")
        .get('/xiyoulibv2/user/login')
        .reply(201, {
          Detail: 'JSESSIONID=35260D4482F3615563950C4546622A5C; Path=/opac_two',
        });
      async.waterfall([
        (cb) => request(app).post('/api/sessions').send({userId: 's03134053', password: '123456'})
          .expect(201, {message: 'SUCCESS', newUser: true}, cb)
      ], finish(done));
    });

    it('用户输入的ID与密码全都正确，并且不是第一次登录：', (done) => {
      nock("https://api.xiyoumobile.com/")
        .get('/xiyoulibv2/user/login')
        .reply(201, {
          Detail: 'JSESSIONID=35260D4482F3615563950C4546622A5C; Path=/opac_two',
        });
      async.waterfall([
        (cb) => new User({userId: 's03134054', password: '123456', email: '565678150@qq.com'}).save((err) => {
          if (err) return done.fail(err);
          request(app).post('/api/sessions').send({userId: 's03134054', password: '123456'})
            .expect(201, {message: 'SUCCESS', newUser: false}, cb);
        })
      ], finish(done));
    });
    it('用户输入的用户名密码不匹配：', (done) => {
      nock("https://api.xiyoumobile.com/")
        .get('/xiyoulibv2/user/login')
        .reply(201, {
          Detail: 'ACCOUNT_ERROR',
        });
      async.waterfall([
        (cb) => request(app).post('/api/sessions').send({userId: 's03134054', password: '122456'})
          .expect(401, '用户名或密码有误，登录失败', cb)
      ], finish(done));
    });
  });
});
