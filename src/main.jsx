import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './pages/root';
import WithButton from './pages/withButton'
import CalcHeight from './pages/calcHeight';
import IntersectionObs from './pages/inersectionObs';
import InfiniteLib from './pages/infintLib';
import Virtual from './pages/virtual';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/with-button",
    element: <WithButton/>,
  },
  {
    path: "/height-calc",
    element: <CalcHeight/>,
  },
  {
    path: "/infinit-lib",
    element: <InfiniteLib/>,
  },
  {
    path: "/intersection",
    element: <IntersectionObs/>,
  },
  {
    path: "/virtual-window",
    element: <Virtual/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
