import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center text-white">
      <div className="animate-spin h-8 w-8 border-t-2 border-yellow-400 border-solid rounded-full"></div>
      <p className="ml-4">Loading...</p>
    </div>
  );
};

export default Loader;
