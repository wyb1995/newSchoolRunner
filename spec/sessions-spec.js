'use strict';
import request from 'supertest';
import app from '../app/server';
import finish from './finish';
import User from '../app/mongodb/user';

describe('sessions-spec', () => {
  beforeEach((done)=> {
    User.find().remove(finish(done));
  });

  it('post true id and password sessions', (done) => {
    new User({userId: 's03134054', password: '123456'}).save(function (err, data) {
      if (err) return done.fail(err);

      User.find(function (err, users) {
        request(app)
          .post('/api/sessions')
          .send({userId: 's03134054', password: '123456'})
          .expect({httpCode: 201, message: "SUCCESS", newUser: false}, finish(done))
      })
    })
  });

  it('post empty id and password 1 sessions', (done) => {
    request(app)
      .post('/api/sessions')
      .send({userId: '', password: '123456'})
      .expect({httpCode: 400, message: "数据不能为空"}, finish(done))
  });
  it('post empty id and password 2 sessions', (done) => {
    request(app)
      .post('/api/sessions')
      .send({userId: 's03134054', password: ''})
      .expect({httpCode: 400, message: "数据不能为空"}, finish(done))
  });
  it('post empty id and password 3 sessions', (done) => {
    request(app)
      .post('/api/sessions')
      .send({userId: ''})
      .expect({httpCode: 400, message: "数据不能为空"}, finish(done))
  });
  it('post error id and password sessions', (done) => {
    request(app)
      .post('/api/sessions')
      .send({userId: 's03134054', password: '122456'})
      .expect({httpCode: 401, message: "用户名或密码有误，登录失败"}, finish(done))
  });
});
