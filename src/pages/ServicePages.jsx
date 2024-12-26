import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const ServicePages = () => {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/all-service?filter=${filter}`
        );
        setServices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchServices();
  }, [filter]);

  const handleSearch = () => {
    const filteredServices = services.filter(service =>
      service.title.toLowerCase().includes(search.toLowerCase())
    );
    setServices(filteredServices);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5 my-10">
        <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            placeholder="Enter service title"
            aria-label="Enter service title"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
        >
          Search
        </button>
        <div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            name="category"
            id="category"
            className="border p-4 rounded-lg"
          >
            <option value="">Select category</option>
            <option value="House Cleaning">House Cleaning</option>
            <option value="Kitchen Cleaning">Kitchen Cleaning</option>
            <option value="Office Cleaning">Office Cleaning</option>
            <option value="Roof Cleaning">Roof Cleaning</option>
            <option value="Window Cleaning">Window Cleaning</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto px-6 gap-4 my-10 max-w-screen-2xl">
        <Helmet>
          <title>Service</title>
        </Helmet>
        {services.map(service => (
          <div key={service._id} className="card w-full shadow-xl">
            <figure>
              <img src={service.image} alt="Service" className="w-full h-64" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{service.title}</h2>
              <p className="text-gray-600">
                {service.description.slice(0, 70)}...
              </p>
              <p>Price: ${service.price}</p>
              <div className="items-start">
                <Link
                  to={`/details/${service._id}`}
                  className="btn btn-primary"
                >
                  See Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ServicePages;
