'use client';

import { UserContext } from "@/context/UserContext";
import Link from "next/link";
import React, { useContext } from "react";
import NavbarAuth from "./NavbarAuth";
import NavbarGuest from "./NavbarGuest";
import { GymContext } from "@/context/GymContext";
import NavbarGym from "./NavbarGym";

const Navbar: React.FC = () => {
  const { userSession } = useContext(UserContext);
  const { gymSession } = useContext(GymContext);

  // Determinar qué Navbar mostrar
  const renderNavbar = () => {
    if (userSession) {
      return <NavbarAuth />;
    } else if (gymSession) {
      return <NavbarGym />;
    } else {
      return <NavbarGuest />;
    }
  };

  return (
    <nav className="flex justify-between items-center py-4 bg-black">
      {/* Logo */}
      <div className="flex justify-center items-center absolute left-1/2 transform -translate-x-1/2">
        <img src="/logo.png" alt="Logo" className="h-20" />
      </div>

      {/* Navegación principal */}
      <ul className="flex space-x-4 ml-4">
        <li>
          <Link href="/" className="button">
            <span className="p">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/about" className="button">
            <span className="p">About</span>
          </Link>
        </li>
        <li>

          <Link href="/products/" className="button">
            <span className="p">Products</span>
          </Link>
          
        </li>
        <li>
          <Link href="/classes" className="button">
            <span className="p">Classes</span>
          </Link>
        </li>
        <li>
          <Link href="/membership" className="button">
            <span className="p">Membership</span>
          </Link>
        </li>
      </ul>

      {/* Renderizado condicional del Navbar */}
      <div className="ml-auto mr-4 space-x-4 flex items-center">
        {renderNavbar()}
      </div>
    </nav>
  );
};

export default Navbar;
