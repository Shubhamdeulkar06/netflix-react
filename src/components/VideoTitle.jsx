const VideoTitle = ({ title, overview }) => {
  return (
    <div className="min-w-full aspect-video text-white py-2 px-4 pt-[30%] lg:pt-[20%] lg:px-24 absolute bg-gradient-to-br from-black">
      <h1 className="text-xl lg:text-6xl font-bold">{title}</h1>
      <p className="hidden lg:block md:p-6 md:text-lg  xl:w-1/4">{overview}</p>
      <div className="font-bold">
        <button className=" px-2 py-1 lg:px-5 text-sm lg:py-3 bg-gray-200 bg-opacity-90 text-black mx-2 rounded-sm hover:bg-opacity-80 ease-in-out ">
          ▶️ Play
        </button>
        <button className="px-2 py-1 lg:px-5 lg:py-3 text-sm bg-gray-800 bg-opacity-90 text-white rounded-sm hover:bg-opacity-80 ease-in-out">
          ❓More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
