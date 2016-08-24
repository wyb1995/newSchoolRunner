import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import LoginPage from './jsx/login-page.jsx';
import personalPage from './jsx/personal-page.jsx'
import homePage from './jsx/home-page.jsx';
import bookCircle from './jsx/bookcircle.jsx'
import App from './jsx/app.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
require('jquery');
require("bootstrap-webpack");

const route = <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRedirect to='/login-page'/>
    <Route path='/login-page' component={LoginPage}/>
    <Route path='/personalInfo-page' component={personalPage}/>
    <Route path='/home-page' component={homePage}/>
    <Route path='/bookCircle-page' component={bookCircle}/>
  </Route>
</Router>;

ReactDOM.render(
  route,
  document.getElementById("content")
);

if (module.hot) {
  module.hot.accept();
}
