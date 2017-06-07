import React from 'react'
import {
  BrowserRouter as Router,
} from 'react-router-dom'

import Layout from '../components/Layout.js'

export default class MyRouter extends React.Component{
  render () {
    return (
      <Router>
        <Layout />
      </Router>
    )
  }
}