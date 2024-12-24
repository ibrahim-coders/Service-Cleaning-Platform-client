import axios from 'axios';
import { useState } from 'react';

const Service = ({ setIsModalOpen, isModalOpen }) => {
  const [updatedService, setUpdatedService] = useState({
    title: '',
    category: '',
    price: '',
  }); // Form data state

  // // Handle form submission to update service
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
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Service</h2>
            <form onSubmit={handleUpdateService}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={updatedService.title}
                  onChange={e =>
                    setUpdatedService({
                      ...updatedService,
                      title: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="category">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  value={updatedService.category}
                  onChange={e =>
                    setUpdatedService({
                      ...updatedService,
                      category: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="price">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  value={updatedService.price}
                  onChange={e =>
                    setUpdatedService({
                      ...updatedService,
                      price: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Service;
