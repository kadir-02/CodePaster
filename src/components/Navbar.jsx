import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-blue-500 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-white text-xl font-bold">CodePaster</div>

          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white text-2xl">
              ☰
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-lg font-semibold hover:text-blue-200 transition border-b-2 border-blue-200"
                  : "text-white text-lg font-semibold hover:text-blue-200 transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/pastes"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-lg font-semibold hover:text-blue-200 transition border-b-2 border-blue-200"
                  : "text-white text-lg font-semibold hover:text-blue-200 transition"
              }
            >
              Pastes
            </NavLink>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 flex flex-col items-center gap-4 bg-blue-600 p-4 rounded-lg shadow-md">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-lg font-semibold hover:text-blue-200 transition border-b-2 border-blue-200"
                  : "text-white text-lg font-semibold hover:text-blue-200 transition"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/pastes"
              className={({ isActive }) =>
                isActive
                  ? "text-white text-lg font-semibold hover:text-blue-200 transition border-b-2 border-blue-200"
                  : "text-white text-lg font-semibold hover:text-blue-200 transition"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Pastes
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
