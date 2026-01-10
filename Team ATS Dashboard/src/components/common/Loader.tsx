import loaderGif from "../../assets/Preloader.gif";

const Loading = () => {
  return (
    <div className="flex items-start justify-center bg-white">
      <div className="w-1/2 h-1/2 flex justify-center items-center">
        <img
          src={loaderGif}
          alt="Loading..."
          className="w-32 h-32 object-contain"
        />
      </div>
    </div>
  );
};

export default Loading;
