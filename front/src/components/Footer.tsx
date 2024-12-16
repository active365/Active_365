import React from 'react';
import Link from 'next/link';

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
        <p className="text-center">
        &copy; 2024 Active 365. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

  