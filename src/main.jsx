import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './pages/root';
import WithButton from './pages/withButton'
import ManualCalc from './pages/manualCalc';
import InfinitLib from './pages/infinitLib';
import IntersectionOserverSample from './pages/intersectionObserver';
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
    element: <ManualCalc/>,
  },
  {
    path: "/infinit-lib",
    element: <InfinitLib/>,
  },
  {
    path: "/intersection",
    element: <IntersectionOserverSample/>,
  },
  {
    path: "/virtual-window",
    element: <Virtual/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
