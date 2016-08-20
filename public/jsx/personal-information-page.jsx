import React, {Component} from 'react';
import request from 'superagent';
class Information extends Component {
  constructor(props) {
    super(props);
    let sessionKey = this.getSessionValue();
    let userId = this.getIdValue();
    this.state = {
      userId: userId,
      session: sessionKey,
      email: "",
      tel: ""
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this._onSubmit.bind(this)}>
          <input type="text" value={this.state.email} onChange={this._onChangeEmail.bind(this)}/>
          <input type="text" value={this.state.tel} onChange={this._onChangeTel.bind(this)}/>
          <button type="submit">submit</button>
        </form>
      </div>
    )
  }

  _onChangeEmail(event) {
    this.setState({
      email: event.target.value
    })
  }

  _onChangeTel(event) {
    this.setState({
      tel: event.target.value
    })
  }

  getIdValue() {
    let startPos = window.location.toString().indexOf("id=");
    return window.location.toString().substr(startPos + 1, 9);

  }

  getSessionValue() {
    let startPos = window.location.toString().indexOf("=");
    let endPos = window.location.toString().indexOf("&");
    return window.location.toString().substring(startPos + 1, endPos);
  }


  _onSubmit(event) {
    event.preventDefault();
    request.post('/api/users')
      .send({
        email: this.state.email,
        tel: this.state.tel
      })
      .end((err, res)=> {

      })
  }
}

export default Information;
