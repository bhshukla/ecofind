// src/components/Navbar.jsx

import { Link } from 'react-router-dom'; // This import is important

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          EcoFinds
        </Link>
        <div className="flex space-x-4">
        <Link to="/my-listings" className="text-gray-800 hover:text-green-500">My Listings</Link>
          <Link to="/cart" className="text-gray-800 hover:text-green-500">Cart</Link>
          {/* This is the button we are fixing */}
          <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;