import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import App from './App';


ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={setupStore()}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<App />} />
          </Routes>
        </BrowserRouter>
    </Provider>
);
