import { Rating } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Swal from 'sweetalert2';

const ReviewsPage = () => {
  const { user } = useAuth();
  const [review, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedText, setUpdatedText] = useState('');
  const [text, setpdatedText] = useState('');
  const [updatedRating, setUpdatedRating] = useState(0);
  const [reviewIdToUpdate, setReviewIdToUpdate] = useState(null);
  const handleRatingChange = newRating => {
    setUpdatedRating(newRating);
  };
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
      setReviews(data);
    } catch (error) {
      console.error(error);
      setReviews([]);
    }
  };

  // Delete review
  const handleDelete = async id => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Your review will be deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/review/${id}`
          );

          if (response.status === 200) {
            setReviews(prevReviews =>
              prevReviews.filter(review => review._id !== id)
            );

            Swal.fire({
              title: 'Deleted!',
              text: 'Your review has been deleted.',
              icon: 'success',
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  // Update review
  const handleUpdateClick = review => {
    setUpdatedText(review.review);
    setpdatedText(review.title);
    setUpdatedRating(review.state.rating);
    setReviewIdToUpdate(review._id);
    setIsModalOpen(true);
  };

  const handleSaveUpdate = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/review/${reviewIdToUpdate}`,
        {
          review: updatedText,
          rating: updatedRating,
          title: text,
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: 'Updated!',
          text: 'Your review has been updated.',
          icon: 'success',
        });
        setIsModalOpen(false);
        fetchReviews();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">User Reviews</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {review.length > 0 ? (
          review.map(reviews => (
            <div
              key={reviews._id}
              className="p-4 border rounded shadow hover:shadow-lg transition"
            >
              <div className="flex items-center mb-4">
                <img
                  src={reviews.person.photo}
                  alt={reviews.person.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h2 className="font-semibold">{reviews.person.name}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(reviews.postedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <Rating
                  value={reviews.state.rating}
                  unratedColor="amber"
                  ratedColor="amber"
                  className="flex w-6 text-orange-500"
                />
                <h2 className="text-sm font-bold pt-2">{reviews.title}</h2>
              </div>
              <p className="text-sm text-gray-700 pt-2 mb-4">
                {reviews.review}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleUpdateClick(reviews)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(reviews._id)}
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {review.length === 0 ? 'No reviews found.' : ''}
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Update Review</h3>
            <div>
              <label className="block">Title</label>
              <input
                type="text"
                value={text}
                onChange={e => setpdatedText(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block">Review Text</label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mt-2"
                value={updatedText}
                onChange={e => setUpdatedText(e.target.value)}
              />
            </div>
            <div className="my-2">
              <label className="block font-medium text-gray-700">Rating</label>
              <Rating
                unratedColor="amber"
                ratedColor="amber"
                className="flex w-6 text-orange-500"
                value={updatedRating}
                onChange={handleRatingChange}
              />
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Close
              </button>
              <button
                onClick={handleSaveUpdate}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
