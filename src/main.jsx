import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import App from './App';
import NotFound from './components/NotFound';
import MainPageNav from './components/MainPageNav';
import Starships from './components/Starships';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPageNav />,
    errorElement: <NotFound />,
    children: [
      {
        path: "home",
        element: <App />,
      },
      {
        path: "starships",
        element: <Starships />
      }
    ],
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
