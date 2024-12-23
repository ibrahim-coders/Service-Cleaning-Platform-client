import { Link } from 'react-router-dom';

const ServicesCard = ({ service }) => {
  const { _id, image, title, description, price } = service || {};
  return (
    <div>
      <div className="card w-full shadow-xl">
        <figure>
          <img src={image} alt="Shoes" className=" w-full h-64" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title.slice(0, 30)}</h2>
          <p className="text-gray-600">{description.slice(0, 70)}...</p>
          <p>Price: ${price}</p>
          <div className="items-start">
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
