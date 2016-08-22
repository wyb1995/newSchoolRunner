import request from 'supertest';
import app from '../../app/server';
import finish from '../finish';
import {User} from '../../app/mongodb/schema';
import db from '../../app/mongodb/db';
import async from 'async';

describe('sessions-spec', () => {

  beforeEach((done)=> {
    async.series([
      (cb) => db.connect('test', cb),
      (cb) => User.find().remove(cb)
    ], finish(done));
  });

  afterEach((done)=> {
    db.close(finish(done));
  });
  it('用户输入的ID与密码全都正确，并且不是第一次登录：', (done) => {
    async.waterfall([
      (cb) => new User({userId: 's03134054', password: '123456', email: '565678150@qq.com'}).save((err) => {
        if (err) return done.fail(err);
        request(app).post('/api/sessions').send({userId: 's03134054', password: '123456'})
          .expect(201, {message: 'SUCCESS', newUser: false}, cb);
      })
    ], finish(done));
  });

  it('用户输入的ID与密码全都正确，并且是第一次登录：', (done) => {
    async.waterfall([
      (cb) => request(app).post('/api/sessions').send({userId: 's03134053', password: '123456'})
        .expect(201, {message: 'SUCCESS', newUser: true}, cb)
    ], finish(done));
  });
  it('用户输入的用户名密码不匹配：', (done) => {
    async.waterfall([
      (cb) => request(app).post('/api/sessions').send({userId: 's03134054', password: '122456'})
        .expect(401, '用户名或密码有误，登录失败', cb)
    ], finish(done));
  });
});
