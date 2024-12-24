import { useLoaderData, useNavigate } from 'react-router-dom';
import { useContext, useState, useRef } from 'react';
import { AuthProvider } from '../Context/AuthContext';
import { Rating } from '@material-tailwind/react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ServiceDetails = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    rating: 0,
  });
  const details = useLoaderData();
  const { user } = useContext(AuthProvider);
  const reviewRef = useRef();
  const {
    category,
    company,
    currentDate,
    description,
    image,
    price,
    title,
    website,
    _id,
  } = details;

  const handleChange = selectedValue => {
    setState(prevState => ({
      ...prevState,
      rating: selectedValue,
    }));
  };

  const handleReviewSubmit = async e => {
    e.preventDefault();
    const review = reviewRef.current.value;

    if (!state.rating || !review) {
      toast.error('Please provide both text and a rating!');
      return;
    }

    const reviewData = {
      serviceId: _id,
      postedDate: new Date().toISOString(),
      title,
      state,
      review,
      person: {
        name: user?.displayName,
        photo: user?.photoURL,
        email: user?.email,
      },
    };
    console.log(user?.email);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/review`,
        reviewData
      );
      toast.success('Review added successfully!');
      navigate('/review');
      reviewRef.current.value = '';
      setState({ rating: 0 });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-screen-sm mx-auto my-10 p-5">
      <img src={image} alt={title} className="mx-auto rounded-lg mb-5" />
      <h2 className=" text-2xl font-bold mb-5">{title}</h2>
      <p className="text-gray-600 mb-3">
        <strong>Category:</strong> {category}
      </p>
      <p className="text-gray-600 mb-3">
        <strong>Company:</strong> {company}
      </p>

      <p className="text-gray-600 mb-3">
        <strong>Website:</strong>{' '}
        <a href={website} className="text-blue-500">
          {website}
        </a>
      </p>
      <p className="text-gray-600 mb-3">
        <strong>Price:</strong> ${price}
      </p>
      <p className="text-gray-600 mb-3">
        <strong>Posted On:</strong> {currentDate}
      </p>
      <p className="text-gray-600 mb-3">
        <strong>Description:</strong> {description}
      </p>

      <form onSubmit={handleReviewSubmit}>
        <div className="mb-10">
          <div className="">
            <label className="block font-medium text-gray-700">Rating</label>

            <Rating
              unratedColor="amber"
              ratedColor="amber"
              className="flex w-6 text-orange-500"
              onChange={handleChange}
              value={state.rating}
            />
          </div>
          <div>
            <label className="block font-medium text-gray-700">
              Add a Review
            </label>
            <textarea
              ref={reviewRef}
              placeholder="Enter service review"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-3"
          >
            Add Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceDetails;
