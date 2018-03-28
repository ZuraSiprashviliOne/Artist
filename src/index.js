
import React from 'react';
import { render } from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';

import App from './Containers/App';

import Store from './store';

render(
    <Provider
        store={Store}>
        <App />
    </Provider>,
    window.document.getElementById('root')
);
registerServiceWorker();