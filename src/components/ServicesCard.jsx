import { Link } from 'react-router-dom';

const ServicesCard = ({ service }) => {
  const { _id, image, title, description, price } = service || {};
  return (
    <div>
      <div className="card w-full shadow-xl  border-2 hover:border-orange-500">
        <figure>
          <img src={image} alt="Shoes" className=" w-full h-64" />
        </figure>
        <div className="px-3 py-2 h-54">
          <h2 className="card-title">{title.slice(0, 20)}...</h2>
          <p className="text-gray-600">{description.slice(0, 70)}...</p>
          <p>Price: ${price}</p>
          <div className="items-start mt-2">
            <Link to={`/details/${_id}`} className="btn btn-primary">
              See Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
