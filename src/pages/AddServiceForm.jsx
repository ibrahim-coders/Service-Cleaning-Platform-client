import { useState } from 'react';

const AddServiceForm = () => {
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    company: '',
    website: '',
    description: '',
    category: '',
    price: '',
  });

  // Automatically set userEmail and addedDate
  // const userEmail = auth?.currentUser?.email || 'guest@example.com';
  const addedDate = new Date().toLocaleString();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const serviceData = {
      ...formData,
      userEmail,
      addedDate,
    };
    console.log('Service Data to Submit:', serviceData);
    // You can send serviceData to your API here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Service Image */}
          <div>
            <label className="block font-medium text-gray-700">
              Service Image
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
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
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter service title"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company Name */}
          <div>
            <label className="block font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
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
              value={formData.website}
              onChange={handleChange}
              placeholder="Enter website URL"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter service description"
            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Web Development">Web Development</option>
              <option value="Graphic Design">Graphic Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Writing">Writing</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
        </div>

        {/* Automatically Set Fields */}
        <div>
          <p className="text-gray-600">
            <strong>Added Date:</strong> {addedDate}
          </p>
          {/* <p className="text-gray-600">
            <strong>User Email:</strong> {userEmail}
          </p> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddServiceForm;
