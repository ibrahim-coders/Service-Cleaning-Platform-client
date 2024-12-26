import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';

const MyService = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [myService, setMyService] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);
  const currentDate = new Date().toLocaleDateString('en-GB');
  const [dates, setDates] = useState(currentDate);

  useEffect(() => {
    if (user?.email) {
      fetchMyService();
    }
  }, [user, filter, search]);

  const fetchMyService = async () => {
    try {
      const response = await axiosSecure.get(
        `/myservice/${user.email}?filter=${filter}&search=${search}`
      );
      if (response.data.length === 0) {
        setNoDataFound(true);
      } else {
        setMyService(response.data);
        setNoDataFound(false);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleDeleteService = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your service will be deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/service/${id}`);
          if (response.status === 200) {
            setMyService(prevServices =>
              prevServices.filter(service => service._id !== id)
            );
            Swal.fire('Deleted!', 'Your service has been deleted.', 'success');
          }
        } catch (error) {
          console.error('Error deleting service:', error);
        }
      }
    });
  };

  const handleEditService = service => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleUpdateService = async e => {
    e.preventDefault();
    const updatedService = {
      title: e.target.title.value,
      image: e.target.image.value,
      company: e.target.company.value,
      website: e.target.website.value,
      category: e.target.category.value,
      price: e.target.price.value,
      currentDate: dates,
      description: e.target.description.value,
    };

    try {
      const response = await axiosSecure.put(
        `/update-service/${selectedService._id}`,
        updatedService
      );

      if (response) {
        setMyService(prevServices =>
          prevServices.map(service =>
            service._id === selectedService._id ? response.data : service
          )
        );
        setIsModalOpen(false);
        setSelectedService(null);
        Swal.fire('Success!', 'Service updated successfully.', 'success');
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleSearchClick = () => {
    fetchMyService();
  };
  // console.log(search, filter);
  return (
    <div className="gap-4 px-8 max-w-screen-2xl mx-auto">
      <Helmet>
        <title>Service| My Service</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">My Services</h1>
      <div className="flex flex-col md:flex-row justify-center items-center gap-5">
        <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
            type="text"
            name="search"
            placeholder="Enter Job Title"
            aria-label="Enter Job Title"
          />
          <button
            onClick={handleSearchClick}
            className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
          >
            Search
          </button>
        </div>

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
      {/* Display No Data Found message if no data is available */}
      {noDataFound ? (
        <div className="text-center py-10 text-xl font-semibold text-red-500">
          No Data Found
        </div>
      ) : (
        <div className="overflow-x-auto px-4 md:px-10 my-10">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                  Title
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                  Category
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                  Price
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 mb-4">
              {myService.map(service => (
                <tr key={service._id} className="hover:bg-gray-100">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                    {service.title}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-start">
                    {service.category}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-start">
                    ${service.price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-start">
                    <button
                      onClick={() => handleEditService(service)}
                      className="text-blue-600 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteService(service._id)}
                      className="text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>
        {/* Modal for updating service */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-2xl mx-4">
              {/* Modal Header */}
              <div className="flex justify-between items-center">
                <h2 id="modal-title" className="text-xl font-bold pb-2">
                  Update Service
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <form className="space-y-4" onSubmit={handleUpdateService}>
                {/* Grid for Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Image */}
                  <div>
                    <label className="block font-medium text-gray-700">
                      Service Image
                    </label>
                    <input
                      type="url"
                      name="image"
                      defaultValue={selectedService?.image || ''}
                      placeholder="Enter image URL"
                      className=" block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                  {/* Service Title */}
                  <div>
                    <label className="block font-medium text-gray-700">
                      Service Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={selectedService?.title || ''}
                      placeholder="Enter service title"
                      className=" block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div>
                    <label className="block font-medium text-gray-700">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      defaultValue={selectedService?.company || ''}
                      placeholder="Enter company name"
                      className=" block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                  {/* Website */}
                  <div>
                    <label className="block font-medium text-gray-700">
                      Website
                    </label>
                    <input
                      type="url"
                      name="website"
                      defaultValue={selectedService?.website || ''}
                      placeholder="Enter website URL"
                      className=" block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      name="category"
                      defaultValue={selectedService?.category || ''}
                      className=" block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    >
                      <option value="" disabled selected>
                        Select category
                      </option>
                      <option value="House Cleaning">House Cleaning</option>
                      <option value="Kitchen Cleaning">Kitchen Cleaning</option>
                      <option value="Office Cleaning">Office Cleaning</option>
                      <option value="Roof Cleaning">Roof Cleaning</option>
                      <option value="Window Cleaning">Window Cleaning</option>
                    </select>
                  </div>
                  {/* Price */}
                  <div>
                    <label className="block font-medium text-gray-700">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      p
                      defaultValue={selectedService?.price || ''}
                      placeholder="Enter price"
                      className=" block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-gray-700">
                      Added Date:
                    </label>

                    <input
                      type="text"
                      value={dates}
                      onChange={e => setDates(e.target.value)}
                      className=" block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  </div>

                  {/* User Email */}
                  <div>
                    <p className="text-gray-600">
                      <strong>User Email:</strong>
                    </p>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      disabled={true}
                      className=" block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  </div>
                </div>
                {/* Description */}
                <div>
                  <label className="block font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    defaultValue={selectedService?.description || ''}
                    className=" block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                    rows="4"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-1 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Update Service
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      ;
    </div>
  );
};

export default MyService;
