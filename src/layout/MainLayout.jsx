import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../pages/Footer';
import { Helmet } from 'react-helmet-async';

const MainLayout = () => {
  return (
    <div className="font-poppins max-w-screen-xl mx-auto px-4">
      <Helmet>
        <title>Service | Home</title>
      </Helmet>

      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
