'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'

import Home from './components/Home'

var baseUrl = '/pwEnhanced.html'

ReactDom.render(
  <Router history={browserHistory}>
    <Route path={baseUrl} component={Home}/>
  </Router>,
  document.getElementById('ReactApp')
)
