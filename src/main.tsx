import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {  
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from './pages/Admin.tsx';
import UserDashboard from './pages/UserDashboard.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/dashboard",
    element: <Admin/>,
  },
  {
    path: "/userLogin",
    element: <App/>,
  },
  {
    path: "/userDashboard",
    element: <UserDashboard/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
