
import React from 'react';
import ReactQuill from 'react-quill'
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

// import _ from 'lodash';
export default class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    console.log(value);
    this.setState({ text: value })
  }

  render() {
    return (
      <ReactQuill value={this.state.text} onChange={this.handleChange} />
    )
  }
}