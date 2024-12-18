
const Home: React.FC = () => {
  return (
    <div className="bg-gray-dark h-screen flex flex-col justify-center items-center relative">
      {/* Imagen Principal */}
      <div className="absolute w-[1300px] h-[805px] -left-[30px] top-[20px]">
        <img
          src="/imageLanding.png"
          alt="Imagen del Landing"
          className="w-full h-full object-contain opacity-50 rounded-r-[120px]"
        />
      </div>

      {/* Contenido Principal */}
      <main className="relative z-10 text-center">
        {/* Frase Principal */}
        <h1 className="text-5xl font-extrabold text-black mb-6">
          Your Fitness Journey Starts Here
        </h1>

        {/* Descripción */}
        <p className="text-lg text-black mb-8 max-w-xl mx-auto">
          Discover personalized fitness training, a convenient schedule, and top-quality products all in one app.
          Join us today and transform your fitness experience!
        </p>

        {/* Botones */}
        <div className="flex justify-center space-x-4">
          <button className="btn">
            Explore More
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;
