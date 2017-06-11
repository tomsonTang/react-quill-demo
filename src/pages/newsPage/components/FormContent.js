

import React, { Component } from 'react';

import ReactQuill from '../../../components/MyEditor-quill-Dom.js'
import FileUpload from '../../../components/fileUpload.js'
import { Button,Row,Col } from 'antd';
class NewsPageContent extends Component {
  
  constructor(props){
    super(props);

    this.state = {
      text:`<h2>Hello World!从这里开始写正文</h2>`,//默认的编辑器内容
      uploadModalvisible: false,//是否打开上传图片组件
    };

    // 缓存上传文件更新事件通知 编辑器初始化使用
    this.fileListChangeFuncCache = {};
  }

  /**
   * 编辑器内容变化事件
   * @param { HTMLSTring } source 编辑器内部HTML
   * @memberof NewsPageContent
   */
  handlerContentChange = (source)=>{
    console.log('编辑器内容 ',source);
    // this.setState({text:value});
  }

  /**
   * 打开图片上传组件 同时注册一个图片列表更新事件
   * @param { Function } pitcureListChange 其具体实现细节由子组件实现
   * @memberof NewsPageContent
   */
  showPictureUploadModal = (pitcureListChange) => {
    this.setState({
      uploadModalvisible: true,
    });

    this.fileListChangeFuncCache.pitcureListChange = pitcureListChange;
  }

  /**
   * 关闭图片上传组件
   * @memberof NewsPageContent
   */
  closePictureUploadModal = () => {
    this.setState({
      uploadModalvisible: false,
    });
  }

  /**
   * 触发图片列表更新事件
   * @param { Array } fileList 上传成功的图片列表
   * @memberof NewsPageContent
   */
  emitPitcureListChange = (fileList)=>{
    this.fileListChangeFuncCache.pitcureListChange(fileList);
  }

  render() {

    const fileUploadProps = {
      isShow:this.state.uploadModalvisible, //是否打开图片上传窗口
      emitClose:this.closePictureUploadModal, //关闭图片上传窗口
      fileListChange:this.emitPitcureListChange, //上传图片更新
    }

    const reactQuillProps = {
      value:this.state.text, //默认的编辑器内容
      onChange:this.handlerContentChange, //编辑器内容变化事件
      emitShowPictureUploadModula:this.showPictureUploadModal //打开上传图片组件
    }

    return (
    <div style={{background:'#fff'}}>

    
     {/* 图片上传组件 */}
     <FileUpload {...fileUploadProps}/>
     {/* 富文本编辑器组件 */}
     <ReactQuill {...reactQuillProps}/>


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