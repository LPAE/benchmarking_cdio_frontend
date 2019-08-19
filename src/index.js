import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';

ReactDOM.render(<Routes basename={process.env.PUBLIC_URL}/>, document.getElementById('root'));
