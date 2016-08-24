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

    it('邮箱为空，手机号不为空：', (done) => {
      async.waterfall([
        (cb) => request(app).post('/api/users')
          .set('Cookie', 'info=s04142003:')
          .send({email: '', tel: '15809287558'})
          .expect(400, '数据不能为空', cb)
      ], finish(done));
    });
    it('邮箱为不空，手机号为空：', (done) => {
      async.waterfall([
        (cb) => request(app).post('/api/users')
          .set('Cookie', 'info=s04142003:')
          .send({email: '845968074@qq.com', tel: ''})
          .expect(400, '数据不能为空', cb)
      ], finish(done));
    });
    it('邮箱格式不正确', (done) => {
      async.waterfall([
        (cb) => request(app).post('/api/users')
          .set('Cookie', 'info=s04142003:')
          .send({email: '845968074qq.com', tel: '15809287558'})
          .expect(400, '电话号码或邮箱格式不正确', cb)
      ], finish(done));
    });
    it('手机格式不正确', (done) => {
      async.waterfall([
        (cb) =>request(app).post('/api/users')
          .set('Cookie', 'info=s04142003:')
          .send({email: '845968074qq.com', tel: '15809287dvdxv'})
          .expect(400, '电话号码或邮箱格式不正确', cb)
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
      nock('https://api.xiyoumobile.com/')
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
      nock('https://api.xiyoumobile.com/')
        .get('/xiyoulibv2/user/login')
        .reply(201, {
          Detail: 'JSESSIONID=35260D4482F3615563950C4546622A5C; Path=/opac_two',
        });
      async.series([(cb) => new User({userId: 's03134054', password: '123456', email: '565678150@qq.com'}).save(cb),
        (cb)=>request(app).post('/api/sessions').send({userId: 's03134054', password: '123456'})
          .expect(201, {message: 'SUCCESS', newUser: false}, cb)
      ], finish(done));
    });
    it('用户输入的用户名密码不匹配：', (done) => {
      nock('https://api.xiyoumobile.com/')
        .get('/xiyoulibv2/user/login')
        .reply(201, {
          Detail: 'ACCOUNT_ERROR',
        });
      async.waterfall([
        (cb) => request(app).post('/api/sessions').send({userId: 's03134054', password: '122456'})
          .expect(401, '用户名或密码有误，登录失败', cb)
      ], finish(done));
    });
    it('用户的邮箱电话号码信息都已经存在本地数据库：', (done) => {
      async.series([
        (cb)=>new User({
          userId: 's04142003', password: '123456', email: '845968074@qq.com', tel: '15809287558'
        }).save(cb),
        (cb)=>request(app).post('/api/users')
          .set('Cookie', 'info=s04142003:')
          .send({email: '845968074@qq.com', tel: '15809287558'})
          .expect(409, '用户信息已经存在', cb)
      ], finish(done));
    });
    it('用户未登录：', (done) => {
      nock('https://api.xiyoumobile.com/')
        .get('/xiyoulibv2/user/login')
        .reply(201, {
          Detail: 'ACCOUNT_ERROR',
        });
      async.series([
        (cb) =>new User({userId: 's04142003', password: '123456'}).save(cb),
        (cb)=> {
          request(app).post('/api/users')
            .set('Cookie', 'info=s04142003:')
            .send({email: '845968074@qq.com', tel: '15809287558'})
            .expect(401, '用户名或密码有误，登录失败', cb);
        }
      ], finish(done));
    });
    it('用户信息已经存在本地：', (done) => {
      nock('https://api.xiyoumobile.com/')
        .get('/xiyoulibv2/user/login')
        .reply(200, {
          Detail: 'JSESSIONID=35260D4482F3615563950C4546622A5C; Path=/opac_two'
        })
        .get('/xiyoulibv2/user/info')
        .reply(200, {
          Detail: {
            Name: '安粉粉',
          }
        });
      async.series([
        (cb) =>new User({userId: 's04142003', password: '123456'}).save(cb),
        (cb) => {
          request(app).post('/api/users')
            .set('Cookie', 'info=s04142003:')
            .send({email: '845968074@qq.com', tel: '15809287558'})
            .expect(201, '用户信息已经存入本地数据库', cb);
        }
      ], finish(done));
    });
  });
});
