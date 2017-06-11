import React from 'react';
import ReactQuill from 'react-quill';

import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

import $ from 'jquery';

// import _ from 'lodash';

export default class MyEditor extends React.Component{

  constructor(props){
    super(props);

    // dom 引用
    this.editorTooBarDIV = null;

    this.state = {
      isNeedCloseToolBar : false,
    }

    // 默认的工具栏 className 用于处理当标题框和作者框编写时不允许使用工具栏
    this.toolBarClassName = '';

    this.closeToolBar = this.closeToolBar.bind(this);
    this.openToolBar = this.openToolBar.bind(this);
    this.getClassName = this.getClassName.bind(this);
  }

  componentDidMount() {
    this.toolBarClassName = this.editorTooBarDIV.className;
  }


  closeToolBar(e){
    this.setState({isNeedCloseToolBar:true})
  }

  openToolBar(e){
    this.setState({isNeedCloseToolBar:false})
  }

  getClassName(){
    return this.state.isNeedCloseToolBar ? `${this.toolBarClassName} close`: this.toolBarClassName
  }

  render() {
    return (
      // {/* Create the editor container */}
      <div className="special-editor-container">
        {/* 工具栏定义 */}
        <div ref={(editorTooBarDIV)=>{this.editorTooBarDIV = editorTooBarDIV}} className={this.getClassName()}>
          <span className="ql-formats">
            <select className="ql-font"></select>
            {/*Add font size dropdown*/}
            <select className="ql-size">
              <option value="small"></option>
              {/*Note a missing, thus falsy value, is used to reset to default*/}
              <option selected value=""></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>
          </span>
          {/*Add a bold button*/}
          <span className="ql-formats">
            <button className="ql-bold"></button>
            <button className="ql-italic"></button>
            <button className="ql-underline"></button>
            <button className="ql-strike"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-blockquote"></button>
            <button className="ql-code-block"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-header" value="1"></button>
            <button className="ql-header" value="2"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-list" value="ordered"></button>
            <button className="ql-list" value="bullet"></button>
          </span>

          <span className="ql-formats">
            {/*Add subscript and superscript buttons*/}
            <button className="ql-script" value="sub"></button>
            <button className="ql-script" value="super"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-indent" value="-1"></button>
            <button className="ql-indent" value="+1"></button>
          </span>

          <span className="ql-formats">
            <button className="ql-direction" value="rtl"></button>
          </span>

          <span className="ql-formats">
            <select className="ql-color"></select>
            <select className="ql-background"></select>
          </span>

          <span className="ql-formats">
            <select className="ql-align"></select>
          </span>

          <span className="ql-formats">
            <button className="ql-image"></button>
            <button className="ql-video"></button>
            <button className="ql-formula"></button>
          </span>
       
          <span className="ql-formats">
            <button className="ql-clean"></button>
          </span>
        </div>
        {/* 工具栏定义结束 */}
      
        <div style={{border:'1px solid #ccc',borderTop:'none'}}>
          <div>
            
            {/* 这是标题区 */}
            <div style={{paddingTop:'30px'}}>
              <input type="text" placeholder="请在这里输入标题" className = "title" onFocus={this.closeToolBar} />
            </div>

            {/* 这是作者区 */}
            <div style={{paddingTop:'18px'}}>
              <input type="text" placeholder="请输入作者" className = "author"  onFocus={this.closeToolBar} />
            </div>

            {/* 构造一条分割线 */}
            <div className="line"></div>

          </div>

          <ReactQuill value={this.props.value} onChange={this.props.handleChange}></ReactQuill>
          
          {/* 实际正文编辑区 */}
        </div>

      </div>
    );
  }
}

