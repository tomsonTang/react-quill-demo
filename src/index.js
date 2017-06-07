import React from 'react';
import ReactDOM from 'react-dom';
import App from './routers/router.js';
// import App from './App';
// import MyEditer from './components/MyEditor-quill.js'
import registerServiceWorker from './registerServiceWorker';
import './index.css';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
