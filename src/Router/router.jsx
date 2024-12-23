import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home/Home';
import AddServiceForm from '../pages/AddServiceForm';
import ServicePages from '../pages/ServicePages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/service',
        element: <ServicePages />,
      },
      {
        path: '/addService',
        element: <AddServiceForm />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

export default router;
