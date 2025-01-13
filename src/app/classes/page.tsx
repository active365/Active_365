'use client';

import React, { useState, useEffect } from 'react';

const GymCard: React.FC<{
  name: string;
  gymId: string;
}> = ({ name, gymId }) => {
  const [classes, setClasses] = useState<{ id: string; name: string; time: string }[]>([]);
  const [loadingClasses, setLoadingClasses] = useState<boolean>(true);
  const [errorClasses, setErrorClasses] = useState<string | null>(null);

  // Cargar las clases al montar el componente
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/classes?gymId=${gymId}`
        );
        if (!response.ok) throw new Error('Error fetching classes');
        const data = await response.json();
        setClasses(data);
      } catch {
        setErrorClasses('Failed to load classes');
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, [gymId]);

  return (
    <div className="max-w-sm mx-auto mb-8 bg-yellow-300 rounded-lg shadow-lg p-6">
      {/* Nombre del gimnasio */}
      <div className="bg-yellow-500 text-white text-xl font-bold text-center p-4 rounded-t-lg">
        {name}
      </div>

      {/* Clases del gimnasio */}
      <div className="mt-4 p-4 bg-yellow-200 rounded-lg border border-gray-300">
        <h3 className="text-sm font-semibold text-gray-800">Classes:</h3>
        {loadingClasses ? (
          <p className="text-gray-600">Loading classes...</p>
        ) : errorClasses ? (
          <p className="text-red-500">{errorClasses}</p>
        ) : classes.length > 0 ? (
          <ul className="list-disc pl-5">
            {classes.map((cls) => (
              <li key={cls.id} className="text-gray-700">
                {cls.name} - {cls.time}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No classes available</p>
        )}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const [gyms, setGyms] = useState<{
    id: string;
    name: string;
  }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Gyms`);
        if (!response.ok) throw new Error('Error fetching gyms');
        const data = await response.json();
        setGyms(data);
      } catch {
        console.error('Failed to load gyms');
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  if (!gyms || gyms.length === 0)
    return <div className="text-center py-4">No gyms found</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Our Gym Classes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gyms.map((gym) => (
          <GymCard key={gym.id} gymId={gym.id} name={gym.name} />
        ))}
      </div>
    </div>
  );
};

export default About;
