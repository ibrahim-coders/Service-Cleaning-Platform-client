import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home/Home';
import AddServiceForm from '../pages/AddServiceForm';
import ServicePages from '../pages/ServicePages';
import ServiceDetails from '../pages/ServiceDetails';
import ReviewsPage from '../pages/ReviewsPage';

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
        path: '/details/:id',
        element: <ServiceDetails />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/details/${params.id}`),
      },
      {
        path: '/addService',
        element: <AddServiceForm />,
      },
      {
        path: '/review',
        element: <ReviewsPage />,
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
