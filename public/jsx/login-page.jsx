import React from 'react';
import Logo from './logo.jsx';
import request from 'superagent';
require('../css/logo.css');
import Footer from './footer.jsx';
require('../css/footer.css');
require('../css/login-page.css');

class Login extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      userId: '',
      password: ''
    }
  }

  render() {
    return (
      <div className="container" id="loginCente">
        <div className="col-md-4 col-md-offset-6" id="login">
          <div className="divClass">
            <label htmlFor="inputStuID">学号</label>
            <input className="inputClass" id="StudentID" type="text" placeholder="StudentID"
                   value={this.state.userId} onChange={this._onIDChange.bind(this)}/>
          </div>

          <div className="divClass">
            <label htmlFor="inputPassword">密码</label>
            <input className="inputClass" type="password" id="password" placeholder="password"
                   value={this.state.password} onChange={this._onPasswordChange.bind(this)}/>
          </div>

          <div>
            <div className="button-center">
              <button type="submit" className="btn btn-primary" id="btnLogin"
                      onClick={this._onSubmit.bind(this)}>登录
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _onIDChange(event) {
    this.setState({userId: event.target.value})
  }

  _onPasswordChange(event) {
    this.setState({password: event.target.value})
  }

  _onSubmit() {
    request.post('/api/sessions')
      .send({
        userId: this.state.userId,
        password: this.state.password
      })
      .end((err, res) => {
        if (err) return console.error(err);
        console.log(res.statusCode);
      })
  }
}


class LoginPage extends React.Component {
  render() {
    return (
      <div className="loginPage">
        <Logo/>
        <Login />
        <Footer/>
      </div>
    )
  }
}
export default LoginPage;
