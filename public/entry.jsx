import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
require('jquery');
require("bootstrap-webpack");
import $ from 'jquery';

const route = <Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRedirect to='/api/sessions'/>
{/*    <Route path='/api/sessions' component={LoginPage}/>*/}
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
