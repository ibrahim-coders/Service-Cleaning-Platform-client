import { useEffect, useState } from 'react';
import Banner from '../Banner';
import HomePage from './HomePage';

import ServicesCard from '../../components/ServicesCard';
import ServiceCleaning from '../../components/ServiceCleaning';

import axios from 'axios';
import CustomersReviews from '../../components/CustomersReviews';

const Home = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/service`
        );
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);
  console.log(services);
  return (
    <section className=" max-w-screen-2xl mx-auto">
      <Banner />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto  gap-4 mb-10">
        {services.map(service => (
          <ServicesCard key={service._id} service={service}></ServicesCard>
        ))}
      </div>
      <HomePage />
      <ServiceCleaning />
      <CustomersReviews />
    </section>
  );
};

export default Home;
