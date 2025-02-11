const Slide = ({ image, text }) => {
  return (
    <div className="relative ">
      <img
        src={image}
        alt="Slide background"
        className="w-full h-[500px] object-fill  bg-center rounded-lg"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
        <h2 className="">{text}</h2>
      </div>
    </div>
  );
};

export default Slide;
