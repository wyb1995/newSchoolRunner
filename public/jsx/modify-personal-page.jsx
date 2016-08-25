import {Link} from 'react-router';
import React from 'react';
import Header from './header.jsx';
import '../css/header.css';
import Footer from './footer.jsx';
import '../css/footer.css';
import  '../css/personal-page.css';
import request from 'superagent';

class Modifiy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userId: '',
      email: '',
      tel: ''
    }
  }

  componentWillMount() {
    request.get('/api/users/current')
      .end((err, res)=> {
        if (err) {
          if (res.statusCode === 401) {
            alert('Please Login!');
            location.herf = '/#/login-page'
          } else {
            return alert(err)
          }
        }
        this.setState({
          username: res.body.userName,
          userId: res.body.userId,
          email: res.body.email,
          tel: res.body.tel
        })
      })
  }

  _onEmailChanged(event) {
    this.setState({
      email: event.target.value
    });
  }

  _onTelChanged(event) {
    this.setState({
      tel: event.target.value
    });
  }

  _onCLickModify() {
    this.setState({
      email: '',
      tel: ''
    })
  }

  _onSubmit(event) {
    event.preventDefault();
    request.get('/api/users/current')
      .end((err, res) => {
        if (err) {
          if (res.statusCode === 401) {
            alert('Please Login!');
            location.href = '/#/login-page'
          } else {
            return alert(err);
          }
        }
        request.post('/api/users/current')
          .send({
            email: this.state.email,
            tel: this.state.tel
          })
          .end((err, res) => {
            if (err) {
              if (res.statusCode === 400) {
                alert('电话或邮箱格式不正确，请给出正确输入！');
                return location.href = '/#/modify-personal-page';
              }
              if (res.statusCode === 401) {
                alert('您未登录，请先登录！');
                return location.href = '/#/login-page';
              }
              return console.error(err);
            }
            if (res.statusCode === 201) {
              alert('修改成功！');
              location.href = '/#/modify-personal-page'
            }
          })
      })
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary back"><Link to="/home-page">返回</Link></button>
        <div className="container" id="personalInfor">
          <form role="form" onSubmit={this._onSubmit.bind(this)}>
            <h2>个人信息</h2>
            <div className="form-group">
              <label htmlFor="inputTel">姓名</label>
              <input type="tel" className="form-control" id="inputTel" placeholder="手机" required="required"
                     value={this.state.username}/>
            </div>
            <div className="form-group">
              <label htmlFor="inputTel">学号</label>
              <input type="tel" className="form-control" id="inputTel" placeholder="手机" required="required"
                     value={this.state.userId}/>
            </div>
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
            <button type="button" className="btn btn-primary modify" onClick={this._onCLickModify.bind(this)}>修改
            </button>
            <button type="submit" className="btn btn-primary" id="submitId">提交</button>
          </form>
        </div>
      </div>
    );
  }
}

class PersonalInfo extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Modifiy/>
        <Footer/>
      </div>
    )
  }
}

export default PersonalInfo;

