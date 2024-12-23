import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ServicePages = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-service`
        );
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, []);
  console.log(services);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto px-6 gap-4 my-10">
      {services.map(service => (
        <div className="card w-full shadow-xl">
          <figure>
            <img src={service.image} alt="Shoes" className=" w-full h-64" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{service.title}</h2>
            <p className="text-gray-600">
              {service.description.slice(0, 70)}...
            </p>
            <p>Price: ${service.price}</p>
            <div className="items-start">
              <Link to={`/details/${service._id}`} className="btn btn-primary">
                See Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicePages;
