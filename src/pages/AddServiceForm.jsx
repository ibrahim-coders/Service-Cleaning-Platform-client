import { useContext } from 'react';
import { AuthProvider } from '../Context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
const AddServiceForm = () => {
  const { user } = useContext(AuthProvider);

  // Get the current date
  const currentDate = new Date().toLocaleDateString();

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const title = form.title.value;
    const company = form.company.value;
    const website = form.website.value;
    const category = form.category.value;
    const price = form.price.value;
    const description = form.description.value;

    // Get current date
    const currentDate = new Date().toLocaleDateString();

    // Prepare data object
    const serviceData = {
      image,
      title,
      company,
      website,
      category,
      price,
      currentDate,
      description,
      userEmail: user?.email,
    };

    try {
      // Post data to server
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/addservice`,
        serviceData
      );
      toast.success('Service added successfully!');
      form.reset();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg my-10">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
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
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
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
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          {/* Website */}
          <div>
            <label className="block font-medium text-gray-700">Website</label>
            <input
              type="url"
              name="website"
              placeholder="Enter website URL"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700">Category</label>
            <select
              name="category"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="" disabled>
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
            <label className="block font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
        </div>

        {/* Automatically Set Fields */}
        <div>
          <p className="text-gray-600">
            <strong>Added Date:</strong> {currentDate}
          </p>
        </div>

        {/* User email */}
        <p className="text-gray-600">
          <strong>User Email:</strong>
          <input
            type="email"
            defaultValue={user?.email}
            disabled={true}
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            required
          />
        </p>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Enter service description"
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddServiceForm;
