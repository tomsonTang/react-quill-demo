import React from 'react'
import { Upload, Icon, Modal } from 'antd';

class PicturesWall extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      previewVisible: false,//图片预览状态
      previewImage: '',//图片预览内容
      fileList: props.defaultFileList || [],
    };

  }

  // 取消预览图片
  handleCancel = () => this.setState({ previewVisible: false })

  // 预览图片
  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  componentWillReceiveProps(nextProps) {

    // 当关闭上传组件时重置 fileList
    const {defaultFileList : fileList } = nextProps;

    if(fileList.length !== this.state.fileList.length){
      this.setState({fileList});
    }

  }

  handleChange = (resp) => {

    console.dir(resp);

    this.setState({ fileList:resp.fileList });

    if(resp.file.status==='uploading'){
      return ;
    }

    const { onfileListChange } = this.props;

    return onfileListChange && onfileListChange(resp);
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;

    const uploadProps = {
      action:"//jsonplaceholder.typicode.com/posts/",
      listType:"picture-card",
      fileList:fileList,
      onPreview:this.handlePreview,
      onChange:this.handleChange
    }

    const modualProps = {
      visible:previewVisible,
      footer:null,
      onCancel:this.handleCancel
    }

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload {...uploadProps} multiple >
          {/* 仅支持最大上传3张图片 */}
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal {...modualProps}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}


export default PicturesWall