"use client"

import React, { useState } from "react";


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Función para el desplegable
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  

  return (
    <nav className="flex justify-between items-center py-4 bg-black">
      {/* Logo*/}
      <div className="flex justify-center items-center absolute left-1/2 transform -translate-x-1/2">
        <img src="/logo.png" alt="Logo" className="h-20" />
      </div>

      <ul className="flex space-x-4 ml-4">
        <li>
          <label className="relative">
            <input
              id="home"
              name="path"
              type="radio"
              className="hidden peer"
            />
            <button className="button">
              <span className="p">Home</span>
            </button>
          </label>
        </li>
        <li>
          <label className="relative">
            <input
              id="about"
              name="path"
              type="radio"
              className="hidden peer"
            />
            <button className="button">
              <span className="p">About</span>
            </button>
          </label>
        </li>
        <li>
          <label className="relative">
            <input
              id="products"
              name="path"
              type="radio"
              className="hidden peer"
            />
            <button className="button">
              <span className="p">Products</span>
            </button>
          </label>
        </li>
        <li>
          <label className="relative">
            <input
              id="classes"
              name="path"
              type="radio"
              className="hidden peer"
            />
            <button className="button">
              <span className="p">Classes</span>
            </button>
          </label>
        </li>
        <li>
          <label className="relative">
            <input
              id="membership"
              name="path"
              type="radio"
              className="hidden peer"
            />
            <button className="button">
              <span className="p">Membership</span>
            </button>
          </label>
        </li>
      </ul>

     
      {/* SearchBar y botones Login/Register */}
      <div className="ml-auto mr-4 space-x-4 flex items-center">
        
  
   {/* Botón Login */}
   <button className="btn">
          Login
    </button>

  <div className="relative inline-block text-left">
    <div>
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex w-full justify-center gap-x-1.5 btn"
        id="menu-button"
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
      >
        Register
        <svg
          className="-mr-1 size-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          data-slot="icon"
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>

    {isOpen && (
      <div
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-light"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-0"
          >
            Gym
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-light"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-1"
          >
            Person
          </a>
        </div>
      </div>
    )}
  </div>
</div>

    </nav>
  );
};

export default Navbar;
