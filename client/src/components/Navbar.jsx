// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          EcoFinds
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/my-listings" className="text-gray-800 hover:text-green-500">My Listings</Link>
          <Link to="/cart" className="text-gray-800 hover:text-green-500">Cart</Link>

          {user ? (
            // If user is logged in, show their name and a Logout button
            <>
              <span className="text-gray-800 font-semibold">Hi, {user.username}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            // If user is not logged in, show the Login button
            <Link to="/login" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;