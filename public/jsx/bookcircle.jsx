import React from 'react';
import Header from './header.jsx';
import Footer from  './footer.jsx';
require('../css/header.css');
require('../css/footer.css');
require('../css/bookcircle.css');
import request from 'superagent';
class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userId: '',
      allMessage: [],
      inputMessage: '',
      newMessage: {}
    }
  }

  componentWillMount() {
    request.get('/api/messages')
      .end((err, res)=> {
        if (err) {
          if (res.statusCode === 401) {
            alert('Please Login!');
            location.herf = '/#/login-page'
          } else {
            return alert(err);
          }
        }
        this.setState({
          allMessage: res.body
        });

      })
  }

  _onSend() {
    request.post('/api/messages')
      .send({
        inputMessage: this.state.inputMessage
      })
      .end((err, res)=> {
        if (err) {
          if (res.statusCode === 401) {
            alert('please login!');
            location.herf = '/#/login-page';
          } else {
            alert(err);
          }
        }
        this.setState({newMessage: res.body});
      })
  }

  _onChangeMessage(event) {
    this.setState({
      inputMessage: event.target.value
    })
  }


  render() {
    const messageList = this.state.allMessage.map((message, index) =>
      <div className="messageList" key={index}>
        <div className="messageContainer common">
          <div>
            <span className="userId">{message.userName}</span>
            <span className="date">{message.date}</span>
            <div className="message">{message.message}</div>
            <button>回复</button>
          </div>
        </div>
      </div>
    );
    return (
      <div className="fullPage">
        <button type="button" className="btn btn-success btnPos">刷新</button>
        {messageList}
        <div className="messageList">
          <div className="messageContainer common">
            <div>
              <span className="userId">{this.state.newMessage.userName}</span>
              <span className="date">{this.state.newMessage.date}</span>
              <div className="message">{this.state.newMessage.message}</div>
              {/*<button>回复</button>*/}
            </div>
          </div>
        </div>
        <div>
          <div className="bottom common">
            <input className="form-control" type="text" placeholder="我要发布"
                   value={this.state.inputMessage}
                   onChange={this._onChangeMessage.bind(this)}/>
            <button className="btn-link" type="button" onClick={this._onSend.bind(this)}>发送</button>
          </div>

        </div>
      </div>
    )
  }
}

class MessageBoard extends React.Component {

  render() {
    return (
      <div id="circleContain">
        <Header />
        <div id="circleBody">
          <MessageList />
        </div>
        <Footer />
      </div>
    )
  }
}
export default MessageBoard ;
