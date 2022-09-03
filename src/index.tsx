import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'antd/dist/antd.min.css';
import { store, persistor } from './state';
import { Provider } from 'react-redux';
import './i18n/configs';
import axios from 'axios';
import { PersistGate } from 'redux-persist/integration/react';
import { Spin } from 'antd';

axios.defaults.headers.common['x-icode'] = 'EE162BCA2EF5FAF8';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
