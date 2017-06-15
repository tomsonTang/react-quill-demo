import React from 'react';

import Quill from 'quill';
import ImageBlot from './ImageBlot.js'

import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

// import _ from 'lodash';

const defaultOptions = {
    debug: 'error',
    modules: {
      toolbar: {
        container:'#toolbar',
        handlers:{}
      }
    },
    placeholder: 'Compose an epic...',
    // readOnly: true,
    theme: 'snow'
};

const createMarkup = (innerHTML) => {
    return {__html: innerHTML};
}


export default class MyEditor extends React.Component{

  constructor(props){
    super(props);

    // dom 引用
    this.editorDIV = null;
    this.editorTooBarDIV = null;
    this.titleInput = null;
    this.authorInput = null;
    // quill 实例(富文本)
    this.quill = null;

    // 参数
    this.options = defaultOptions;

    this.state = {
      isNeedCloseToolBar : false,
    }

    // 默认的工具栏 className 用于处理当标题框和作者框编写时不允许使用工具栏
    this.toolBarClassName = '';
  }

  componentDidMount() {
    Quill.register(ImageBlot);

    this.options.modules.toolbar.container = this.editorTooBarDIV;
    this.quill = new Quill(this.editorDIV, this.options);
    // 获取 ToolBar 的原始样式 必须在实例化之后获取
    this.toolBarClassName = this.editorTooBarDIV.className;

    // 当文本内容发送改变时通知父组件
    this.quill.on('text-change',()=>{
      this.props.onChange({
        editorContent:this.editorDIV.querySelector('.ql-editor').innerHTML,//编辑器内容
        title:this.titleInput.value,
        author:this.authorInput.value
      });
    });

    // 注册 image 按钮事件
    this.quill.getModule('toolbar').addHandler('image', ()=>{
      // 像父组件注入回调 当添加完上传图片后执行回调
      this.props.emitShowPictureUploadModula(this.pictureFileListChange)
    });


  }

  /**
   * 拿到上传图片 插入正文
   * file 结构 
   * {
   *   uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
   *   name: 'xx.png'   // 文件名
   *   status: 'done',  // 状态有：uploading done error removed
   *   response: '{"status": "success"}',  // 服务端响应内容
   * }
   * 
   * @param {any} fileList 
   * 
   * @memberof MyEditor
   */
  pictureFileListChange = (fileList) =>{

    console.log('resp',fileList);
    let range = this.quill.getSelection(true);
    this.quill.insertText(range.index, '\n', Quill.sources.USER);

    fileList.forEach((file,index)=>{
      this.quill.insertEmbed(range.index + 1 + index, 'image', {
        alt: file.name,
        url: file.url
      }, Quill.sources.USER);
    });
    this.quill.setSelection(range.index + fileList.length, Quill.sources.SILENT);
  }

  /**
   * 关闭 ToolBar
   * 
   * @memberof MyEditor
   */
  closeToolBar = (e)=>{
    this.setState({isNeedCloseToolBar:true})
  }

  /**
   * 启动 ToolBar
   * 
   * @memberof MyEditor
   */
  openToolBar = (e)=>{
    this.setState({isNeedCloseToolBar:false})
  }

  /**
   * 通过切换样式来启用关闭 
   * 
   * @memberof MyEditor
   */
  getClassName = ()=>{
    return this.state.isNeedCloseToolBar ? `${this.toolBarClassName} close`: this.toolBarClassName
  }

  render() {

    const { value } = this.props;

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
            <button className="ql-link"></button>
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
              <input ref={(titleInput)=>{this.titleInput = titleInput}} type="text" placeholder="请在这里输入标题" className = "title" onFocus={this.closeToolBar} />
            </div>

            {/* 这是作者区 */}
            <div style={{paddingTop:'18px'}}>
              <input ref={(authorInput)=>{this.authorInput = authorInput}} type="text" placeholder="请输入作者" className = "author"  onFocus={this.closeToolBar} />
            </div>

            {/* 构造一条分割线 */}
            <div className="line"></div>

          </div>
          
          {/* 实际正文编辑区 */}
          <div ref={ (editorDIV) =>{ this.editorDIV = editorDIV; }} dangerouslySetInnerHTML={ value.length ? createMarkup( value ):''} onFocus={this.openToolBar} ></div>
        </div>

      </div>
    );
  }
}