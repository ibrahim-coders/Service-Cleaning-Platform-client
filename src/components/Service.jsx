import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthProvider } from '../Context/AuthContext';

const Service = ({ setIsModalOpen, isModalOpen, myService }) => {
  const { user } = useContext(AuthProvider);
  const [updatedService, setUpdatedService] = useState({
    title: '',
    category: '',
    price: '',
  });

  const handleUpdateService = async e => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/service/${updatedService._id}`,
        updatedService
      );
      if (response.status === 200) {
        setIsModalOpen(false);
        Swal.fire({
          title: 'Updated!',
          text: 'Your service has been updated.',
          icon: 'success',
        });
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
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
            <form
              onSubmit={() => handleUpdateService(myService)}
              className="space-y-4"
            >
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
                    placeholder="Enter price"
                    className=" block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Automatically Set Fields */}
                <div>
                  <p className="text-gray-600">
                    <strong>Added Date:</strong>{' '}
                    {/* Add actual date dynamically */}
                  </p>
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
                  placeholder="Enter service description"
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
  );
};

export default Service;
