import image from '../../assets/Cleaning.webp';
const HomePage = () => {
  return (
    <div className="flex flex-col md:flex-row mx-auto gap-8 px-8">
      <div className="w-full">
        <img src={image} alt="" />
      </div>
      <div className="w-full mt-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          House Cleaning Services
        </h2>
        <p className="text-sm py-4">
          Treat yourself and your house to a top-quality house cleaning service.
          Born out of a vision to create the best residential cleaning services,
          AspenClean delivers professional-grade house cleaning services without
          bringing any harmful chemicals into your home. Our trained teams use
          AspenClean green & organic cleaning products and eco friendly cloths
          exclusively, giving your house an all-natural zero waste shine that
          you can trust.
        </p>
        <button className="btn btn-warning">Details</button>
      </div>
    </div>
  );
};

export default HomePage;
