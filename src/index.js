import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';

const Test = props => (<div>test</div>)

ReactDOM.render(<Test basename={process.env.PUBLIC_URL}/>, document.getElementById('root'));
