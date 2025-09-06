// src/components/Navbar.jsx

function Navbar() {
    return (
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-gray-800">
            EcoFinds
          </a>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-800 hover:text-green-500">My Listings</a>
            <a href="#" className="text-gray-800 hover:text-green-500">Cart</a>
            <a href="#" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
              Login
            </a>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navbar;