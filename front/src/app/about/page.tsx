'use client';

import React, { useState, useEffect } from 'react';

// Componente GymCard para mostrar la información de un gimnasio individual
const GymCard: React.FC<{
  name: string;
  email: string;
  phone: number;
  address: string;
  city: string;
  createdAt: Date;
  imageUrl: string; // Recibimos la URL de la imagen
  gymId: string; // Recibimos el ID del gimnasio para asociar las clases
}> = ({ name, email, phone, address, city, createdAt, imageUrl, gymId }) => {
  const [classes, setClasses] = useState<any[]>([]); // Estado para manejar las clases
  const [loadingClasses, setLoadingClasses] = useState<boolean>(true); // Estado de carga de clases
  const [errorClasses, setErrorClasses] = useState<string | null>(null); // Estado para manejar errores en la carga de clases

  // Crear un enlace de Google Maps con la dirección del gimnasio
  const googleMapsLink = `https://www.google.com/maps?q=${encodeURIComponent(address)},${encodeURIComponent(city)}`;

  // Llamada a la API para obtener las clases asociadas al gimnasio
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://localhost:3000/Classes?gymId=${gymId}`);
        if (!response.ok) {
          throw new Error('Error fetching classes');
        }
        const data = await response.json();
        setClasses(data); // Guardamos las clases en el estado
      } catch (err) {
        setErrorClasses('Failed to load classes');
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, [gymId]); // Ejecutamos la llamada cuando se cambia el gymId

  return (
    <div className="max-w-sm mx-auto mb-8 bg-yellow-300 rounded-lg shadow-lg p-6">
      {/* Cuadro más llamativo para el nombre del gimnasio */}
      <div className="bg-yellow-500 text-white text-xl font-bold text-center p-4 rounded-t-lg">
        {name}
      </div>

      {/* Cuadro de imagen del gimnasio */}
      {imageUrl && (
        <div className="my-4">
          <img
            src={imageUrl}
            alt={`Gym - ${name}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}
      
      {/* Información del gimnasio */}
      <div className="p-4">
        <p className="text-sm text-gray-700 mb-2">
          <strong>Email:</strong> {email}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Phone:</strong> {phone ? phone : 'Not provided'}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Address:</strong> {address || 'Not provided'}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>City:</strong> {city || 'Not provided'}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Created at:</strong> {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Recuadro para el enlace a Google Maps */}
      <div className="mt-4 p-4 bg-yellow-200 rounded-lg border border-gray-300">
        <h3 className="text-sm font-semibold text-gray-800">Location:</h3>
        {address && city ? (
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            View on Google Maps
          </a>
        ) : (
          <p className="text-gray-600">No address available</p>
        )}
      </div>

      {/* Recuadro para mostrar las clases */}
      <div className="mt-4 p-4 bg-yellow-200 rounded-lg border border-gray-300">
        <h3 className="text-sm font-semibold text-gray-800">Classes:</h3>
        {loadingClasses ? (
          <p className="text-gray-600">Loading classes...</p>
        ) : errorClasses ? (
          <p className="text-red-500">{errorClasses}</p>
        ) : classes.length > 0 ? (
          <ul className="list-disc pl-5">
            {classes.map((cls: any) => (
              <li key={cls.id} className="text-gray-700">
                {cls.name} - {cls.time} {/* Aquí puedes mostrar el nombre de la clase y su horario */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Classes not available at the moment</p>
        )}
      </div>
    </div>
  );
};

// Componente principal de la página About
const About: React.FC = () => {
  // Estado para manejar la lista de gimnasios, el estado de carga y posibles errores
  const [gyms, setGyms] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Llamada a la API para obtener todos los gimnasios
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await fetch('http://localhost:3000/Gyms'); // Endpoint para obtener todos los gimnasios
        if (!response.ok) {
          throw new Error('Error fetching gyms');
        }
        const data = await response.json();
        setGyms(data); // Guardamos los gimnasios en el estado
      } catch (err) {
        setError('Failed to load gyms');
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, []); // Ejecutamos una vez al montar el componente

  // Si está cargando, mostramos un mensaje de carga
  if (loading) {
    return <div>Loading...</div>;
  }

  // Si ocurrió un error, mostramos un mensaje de error
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Si no hay gimnasios, mostramos un mensaje
  if (!gyms || gyms.length === 0) {
    return <div>No gyms found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">About</h1>
      {/* Ajustar la cuadrícula para las tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gyms.map((gym) => (
          <GymCard
            key={gym.id}
            gymId={gym.id} // Pasamos el gymId a la tarjeta
            name={gym.name}
            email={gym.email}
            phone={gym.phone}
            address={gym.address}
            city={gym.city}
            createdAt={gym.createdAt}
            imageUrl={gym.imageUrl || ''} // Asegurándonos de pasar la imagen
          />
        ))}
      </div>
    </div>
  );
};

export default About;
