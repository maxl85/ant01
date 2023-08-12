import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { store } from './redux/store';
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}

    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  </Provider>
);