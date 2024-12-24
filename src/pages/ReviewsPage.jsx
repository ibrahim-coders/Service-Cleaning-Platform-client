import { Rating } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

const ReviewsPage = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetchReviews();
    }
  }, [user]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/review-show/${user.email}`
      );
      const data = Array.isArray(response.data)
        ? response.data
        : [response.data];
      console.log('Fetched Reviews:', data);
      setReviews(data);
    } catch (error) {
      console.error(error);
      setReviews([]);
    }
  };
  //delete riview
  const handleDelete = id => {
    console.log(id);
  };
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">User Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div
              key={review._id}
              className="p-4 border rounded shadow hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <img
                  src={review.person.photo}
                  alt={review.person.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h2 className="font-semibold">{review.person.name}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(review.postedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <Rating
                  value={review.state.rating}
                  unratedColor="amber"
                  ratedColor="amber"
                  className="flex w-6 text-orange-500"
                />
                <h2 className="text-sm font-bold pt-2">{review.title}</h2>
              </div>
              <p className="text-sm text-gray-700 pt-2 mb-4">{review.review}</p>
              <div className=" flex gap-4">
                <button
                  // onClick={() => handleUpdate(review)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {reviews.length === 0 ? 'No reviews found.' : ''}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
