import axios from 'axios';
import { useEffect, useState } from 'react';

const ReviewsPage = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/review-show`
        );
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, []);
  console.log(services);
  const firstService = services[0];
  console.log(firstService);
  return <div></div>;
};

export default ReviewsPage;
