import React from 'react';
import { Modal, Button } from 'antd';
import PicturesWall from './PicturesWall';

class fileUpload extends React.Component {

  state = {
    loading: false,//上传状态
    fileList:[]
  }

  /**
   * 确认提交
   * @memberof fileUpload
   */
  handleOk = () => {
    this.setState({ loading: true });

    // 展现 loading状态 .5秒再关闭上传组件
    setTimeout(() => {
      // 重置 fileList
      this.setState({ loading: false });
      this.props.fileListChange(this.state.fileList);
      this.resertFileList();
      this.props.emitClose();
    }, 500);
  }


  filterFIleUpload = (resp)=>{

    const { fileList } = resp;

    if(!fileList.length){
      return;
    }

    this.setState({fileList});
  }

  resertFileList = ()=>{
    this.setState({fileList:[]});
  }

  /**
   * 取消提交
   * @memberof fileUpload
   */
  handleCancel = ()=>{
    // 重置 fileList
    this.resertFileList();
    // 关闭当前上传组件
    this.props.emitClose();
  }


  render() {

    const modalProps = {
      title:"图片上传",
      visible:this.props.isShow,
      onOk:this.handleOk,
      onCancel:this.handleCancel
    }

    const backButtonProps = {
      key:"back",
      size:"large",
      onClick:this.handleCancel
    }

    const submitButtonProps = {
      key:"submit",
      type:"primary",
      size:"large",
      loading:this.state.loading,
      onClick:this.handleOk
    }

    return (
      <div>
        <Modal
          {...modalProps}
          footer={[
            <Button {...backButtonProps}>Return</Button>,
            <Button {...submitButtonProps}> Submit </Button>
          ]}
        >
          <PicturesWall onfileListChange={ this.filterFIleUpload } defaultFileList={this.state.fileList} />
        </Modal>
      </div>
    );
  }
}

export default fileUpload;