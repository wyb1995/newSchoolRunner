import React from 'react';
import Header from './header.jsx';
import '../css/header.css';
import Footer from './footer.jsx';
import '../css/footer.css';
import  '../css/personal-page.css';
import request from 'superagent';

class Personal extends React.Component {
  constructor(props) {
    super(props);

    let userId = this.getIdValue();
    let sessionKey = this.getSessionValue();

    this.state = {
      userId: userId,
      seesionkey: sessionKey,
      email: '',
      tel: ''
    }
  }

  getIdValue() {
    let startPos = window.location.toString().indexOf("userId=");
    let userId = window.location.toString().substr(startPos + 7, 9);

    return userId;
  }

  getSessionValue() {
    let startPos = window.location.toString().indexOf("=");
    let endPos = window.location.toString().indexOf("&");
    let session = window.location.toString().substring(startPos + 1, endPos);

    return session;
  }


  _onEmailChanged(event){
    this.setState({
      email: event.target.value
    });
  }

  _onTelChanged(event){

    this.setState({
      tel: event.target.value
    });
  }

  _onSubmit(event){
    event.preventDefault();

    request.post('/api/users')
      .send({
        userId: this.state.userId,
        sessionKey: this.state.seesionkey,
        email: this.state.email,
        tel: this.state.tel
      })
      .end((err, res) => {
        if (err){
          if (res.statusCode === 400) {
            console.log(res.text);
             return location.href = '/#/personal-page';
          }

          if (res.statusCode === 403) {
            console.log(res.text);
            return location.href='/#/login-page';
          }

          if (res.statusCode === 409) {
            console.log(res.text);
             return location.href = '/#/home-page'
          }

          return console.error(err);
        }

        if (res.statusCode === 201) {
          console.log(res.text);
          location.href = '/#/home-page'
        }
      })
  }

  render() {
    return (
      <div className="container" id="personalInfor">
        <form role="form"  onSubmit={this._onSubmit.bind(this)}>
          <h2>个人信息</h2>
          <div className="form-group">
            <label htmlFor="inputEmail">电子邮箱</label>
            <input type="email" className="form-control" id="inputEmail" placeholder="邮箱" required="required"
                   value={this.state.email} onChange={this._onEmailChanged.bind(this)}/>
          </div>

          <div className="form-group">
            <label htmlFor="inputTel">手机号码</label>
            <input type="tel" className="form-control" id="inputTel" placeholder="手机" required="required"
                   value={this.state.tel} onChange={this._onTelChanged.bind(this)}/>
          </div>

          <button type="submit" className="btn btn-primary" id="submitId">提交</button>
        </form>
      </div>
    );
  }
}

class PersonalInfo extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Personal/>
        <Footer/>
      </div>
    )
  }
}

export default PersonalInfo;

