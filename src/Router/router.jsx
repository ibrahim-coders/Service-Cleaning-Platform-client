import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home/Home';
import AddServiceForm from '../pages/AddServiceForm';
import ServicePages from '../pages/ServicePages';
import ServiceDetails from '../pages/ServiceDetails';
import ReviewsPage from '../pages/ReviewsPage';
import PrivatRoute from './PrivatRoute';
import MyService from '../pages/MyService';
import ErrorPage from '../components/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
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
        element: (
          <PrivatRoute>
            <ServiceDetails />
          </PrivatRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/details/${params.id}`),
      },
      {
        path: '/addService',
        element: (
          <PrivatRoute>
            <AddServiceForm />
          </PrivatRoute>
        ),
      },
      {
        path: '/myservice',
        element: (
          <PrivatRoute>
            <MyService />
          </PrivatRoute>
        ),
      },
      {
        path: '/review',
        element: (
          <PrivatRoute>
            <ReviewsPage />
          </PrivatRoute>
        ),
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
