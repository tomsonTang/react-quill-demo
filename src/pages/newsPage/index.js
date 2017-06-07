import React, { Component } from 'react';
import {Row,Col} from 'antd';

import Sider from './components/Sider.js';
import BlankContent from './components/BlankContent'
import FormContent from './components/FormContent'

import { ADD_NEWS_TYPE_BLANK } from './contans.js'
class NewsPage extends Component {

  constructor(props) {
    super(props);
  }

  getConetentByTYpe(id){
    if (+id === ADD_NEWS_TYPE_BLANK ) {
      return <BlankContent />
    }
    return <FormContent />
  }

  render () {

    console.log(this.props.match);

    return (
      <Row gutter={16} style={{height:'100%'}}>
        <Col span={6} >
          <Sider />
        </Col>
        <Col span={18}>
          {this.getConetentByTYpe(this.props.match.params.id)}
        </Col>
      </Row>
    )
  }
}

export default NewsPage