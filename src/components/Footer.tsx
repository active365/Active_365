import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'; // Importando los íconos de React Icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-sm text-gray-light py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center space-y-6">
        <div className="flex space-x-8">
          <Link href="/">
            <span className="btn">
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className="btn">
              About
            </span>
          </Link>
        </div>
        
        {/* Redes sociales - íconos */}
        <div className="flex space-x-6">
          <Link href="https://www.facebook.com" target="_blank" className="text-white hover:text-blue-600">
            <FaFacebook size={30} />
          </Link>
          <Link href="https://www.instagram.com" target="_blank" className="text-white hover:text-pink-600">
            <FaInstagram size={30} />
          </Link>
          <Link href="https://www.tiktok.com" target="_blank" className="text-white hover:text-black">
            <FaTiktok size={30} />
          </Link>
          <Link href="https://wa.me" target="_blank" className="text-white hover:text-green-600">
            <FaWhatsapp size={30} />
          </Link>
        </div>

        <p className="text-center text-white">
          &copy; 2024 Active 365. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
