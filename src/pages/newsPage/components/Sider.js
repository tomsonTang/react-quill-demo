import React, { Component } from 'react';
import { Card } from 'antd';
class NewsPageSider extends Component {
  render() {
    return (
      <Card style={{ width: '100%',background:'#fff' }} bodyStyle={{ padding: 0 }}>
        <div className="custom-image">
          <img alt="example" width="100%" src="http://via.placeholder.com/350x150" />
        </div>
        <div className="custom-card">
          <h3>标题</h3>
        </div>
      </Card>
    );
  }
}

export default NewsPageSider;