import Link from "next/link"
import { useState } from "react";

const NavbarGuest: React.FC = ()=>{
const [isOpen, setIsOpen] = useState(false);
      //Función para el desplegable
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const toggleDropdownLogin = () => {
    setIsOpenLogin(!isOpenLogin);
  };


    return (<>
            {/* Login */}
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  onClick={toggleDropdownLogin}
                  className="inline-flex w-full justify-center gap-x-1.5 btn"
                  id="menu-button"
                  aria-expanded={isOpenLogin ? "true" : "false"}
                  aria-haspopup="true"
                >
                  Login
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
    
              {isOpenLogin && (
                <div
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    <Link
                      href="/loginGym"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-light"
                    >
                      Gym
                    </Link>
                    <Link
                      href="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-light"
                    >
                      Person
                    </Link>
                  </div>
                </div>
              )}
            </div>
    
            {/* Dropdown Register */}
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
                    <Link
                      href="/registerGym"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-light"
                    >
                      Gym
                    </Link>
                    <Link
                      href="/registerPerson"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-light"
                    >
                      Person
                    </Link>
                  </div>
                </div>
              )}
            </div>
    
    </>)
}

export default NavbarGuest