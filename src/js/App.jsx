var React = require('react')
var ReactDom = require('react-dom')
var Router = require('react-router').Router
var Route = require('react-router').Route
var browserHistory = require('react-router').browserHistory

var Home = require('./components/Home');

var baseUrl = '/pwEnhanced.html'

ReactDom.render(
  <Router history={browserHistory}>
    <Route path={baseUrl} component={Home}/>
  </Router>,
  document.getElementById('ReactApp')
)
