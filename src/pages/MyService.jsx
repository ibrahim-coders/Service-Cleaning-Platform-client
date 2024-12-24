import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Service from '../components/Service';

const MyService = () => {
  const { user } = useAuth();
  const [myService, setMyService] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (user?.email) {
      fetchMyService();
    }
  }, [user]);

  const fetchMyService = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/myservice/${user.email}`
      );
      setMyService(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  // Delete service handler
  const handleDeleteService = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your service will be deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/service/${id}`
          );

          if (response.status === 200) {
            setMyService(prevServices =>
              prevServices.filter(service => service._id !== id)
            );

            Swal.fire({
              title: 'Deleted!',
              text: 'Your service has been deleted.',
              icon: 'success',
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="gap-4 px-8 max-w-screen-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Services</h1>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search services..."
        // value={searchQuery}
        // onChange={e => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />
      <div className="overflow-x-auto px-4 md:px-10">
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
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {myService.map(service => (
              <tr key={service._id} className="hover:bg-gray-100">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                  {service.title.length > 10
                    ? `${service.title.slice(0, 20)}...`
                    : service.title}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-start">
                  {service.category}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-start">
                  {service.price}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 flex items-start space-x-6 text-start">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteService(service._id)} // Corrected here
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-2"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Service isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
};

export default MyService;
