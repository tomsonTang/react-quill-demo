
import React, { Component } from 'react';

import ReactQuill from '../../../components/MyEditor-quill.js'

class NewsPageContent extends Component {

  constructor(props){
    super(props);

    this.state = {
      text:`<h2 class="ql-align-center">Hello World!从这里开始写正文</h2>`
    }

    this.handlerChange = this.handlerChange.bind(this);
  }

  handlerChange(value){
    this.setState({text:value});
  }

  render() {
    return (
      <div style={{background:'#fff'}}>
        <ReactQuill value={this.state.text} />
      </div>
    );
  }
}

export default NewsPageContent;