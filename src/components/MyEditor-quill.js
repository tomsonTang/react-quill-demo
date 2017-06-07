
import React from 'react';

import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';

// import _ from 'lodash';

const toolbarOptions = [
  [{ font: [] },{ header: [1, 2, 3, 4, 5, 6, false] }],

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  // [{ size: ["small", false, "large", "huge"] }], // custom dropdown

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ align: [] }],

  ["image","video","formula"],

  ["clean"] // remove formatting button
];

const defaultOptions = {
    debug: 'info',
    modules: {
      toolbar: toolbarOptions
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

    this.editorDIV = null;
    this.quill = null;

    // 提取 props 中的 defaultOptions 相关内容并覆盖 
    // 有数组需要重新制定覆盖策略
    // this.options = _.defaultsDeep(defaultOptions, _.pick(props, _.keys(defaultOptions)));
    this.options = defaultOptions;
    this.value = props.value;
  }

  componentDidMount() {
    this.quill = new Quill(this.editorDIV, this.options);
  }

  render() {
    return (
      // {/* Create the editor container */}
      <div ref={ (editorDIV) =>{ this.editorDIV = editorDIV; }} dangerouslySetInnerHTML={this.value.length ? createMarkup(this.value):''}></div>
    );
  }
}

