import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import MainPageNav from './components/MainPageNav';
import { Provider } from 'react-redux';
import store from './store/store';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MainPageNav />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
