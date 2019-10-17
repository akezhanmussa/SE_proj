import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM.render(<App/>, document.getElementById('root'))

serviceWorker.unregister();
