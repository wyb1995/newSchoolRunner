import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import LoginPage from './jsx/login-page.jsx';
import App from './jsx/app.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
require('jquery');
require("bootstrap-webpack");
import $ from 'jquery';

const route = <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRedirect to='/login-page'/>
    <Route path='/login-page' component={LoginPage}/>
  </Route>
</Router>;

ReactDOM.render(
  route,
  document.getElementById("content")
);
console.log($('#content').text());

if (module.hot) {
  module.hot.accept();
}
