

import React, { Component } from 'react';

import ReactQuill from '../../../components/MyEditor-quill-Dom.js'
import { Form, Icon, Input, Button,Row,Col } from 'antd';

const FormItem = Form.Item;
class NewsPageContent extends Component {

  constructor(props){
    super(props);

    this.state = {
      text:`<h2>Hello World!从这里开始写正文</h2>`
    }

    this.handlerChange = this.handlerChange.bind(this);
  }

  handlerChange(source){
    console.log(source);
    // this.setState({text:value});
  }

  render() {
    return (
    <div style={{background:'#fff'}}>
     <ReactQuill value={this.state.text} onChange={this.handlerChange}/>
     <Row style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'20px'}}>
      <Col span={6}>
        <Button size="large">保存</Button>
      </Col>
      <Col span={6}>
        <Button size="large">预览</Button>
      </Col>
     </Row>
    </div>
    );
  }
}

export default NewsPageContent;