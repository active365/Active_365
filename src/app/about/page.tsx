'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const GymCard: React.FC<{
  name: string;
  email: string;
  phone: number;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  imageUrl: string;
  gymId: string;
}> = ({ name, email, phone, address, city, latitude, longitude, createdAt, imageUrl, }) => {
  const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <div className="max-w-sm mx-auto mb-8 bg-yellow-300 rounded-lg shadow-lg p-6">
      <div className="bg-yellow-500 text-white text-xl font-bold text-center p-4 rounded-t-lg">
        {name}
      </div>

      {imageUrl && (
        <div className="my-4">
          <Image
            src={imageUrl}
            alt={`Gym - ${name}`}
            className="w-full h-48 object-cover rounded-lg"
            width={400}
            height={300}
          />
        </div>
      )}

      <div className="p-4">
        <p className="text-sm text-gray-700 mb-2">
          <strong>Email:</strong> {email}
        </p>
        <p className="text-sm text-gray-700 mb-2">
          <strong>Phone:</strong> {phone || 'Not provided'}
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

      <div className="mt-4 p-4 bg-blue-200 rounded-lg border border-gray-300">
        <h3 className="text-sm font-semibold text-gray-800">Location:</h3>
        {latitude && longitude ? (
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 py-2 text-center bg-yellow-500 text-white rounded-lg"
          >
            View on Google Maps
          </a>
        ) : (
          <p className="text-gray-600">Location not available</p>
        )}
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const [gyms, setGyms] = useState<{
    id: string;
    name: string;
    email: string;
    phone: number;
    address: string;
    city: string;
    latitude: number;
    longitude: number;
    createdAt: Date;
    imageUrl: string;
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
      <h1 className="text-2xl font-bold text-center mb-6">About Our Gyms</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gyms.map((gym) => (
          <GymCard
            key={gym.id}
            gymId={gym.id}
            name={gym.name}
            email={gym.email}
            phone={gym.phone}
            address={gym.address}
            city={gym.city}
            latitude={gym.latitude}
            longitude={gym.longitude}
            createdAt={gym.createdAt}
            imageUrl={gym.imageUrl || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default About;