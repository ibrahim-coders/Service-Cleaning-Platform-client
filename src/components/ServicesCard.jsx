const ServicesCard = ({ service }) => {
  const { image, title, description, price } = service || {};
  return (
    <div>
      <div className="card w-full shadow-xl">
        <figure>
          <img src={image} alt="Shoes" className=" w-full h-64" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="text-gray-600">{description.slice(0, 70)}...</p>
          <p>Price: ${price}</p>
          <div className="items-start">
            <button className="btn btn-primary">See Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
