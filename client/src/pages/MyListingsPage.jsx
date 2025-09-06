// src/pages/MyListingsPage.jsx
import { Link } from 'react-router-dom';
import { products } from '../mockData';

function MyListingsPage() {
  // We'll filter for the logged-in user's products later.
  // For now, let's just show the first two as an example.
  const myListings = products.slice(0, 2);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Listings</h1>
        <Link
          to="/add-product"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          + Add New Product
        </Link>
      </div>
      <div className="space-y-4">
        {myListings.map(item => (
          <div key={item.id} className="flex items-center p-4 border rounded-lg shadow-sm bg-white">
            <img
              src="https://via.placeholder.com/100"
              alt={item.title}
              className="w-20 h-20 object-cover rounded-md mr-4"
            />
            <div className="flex-grow">
              <h2 className="font-bold text-lg text-gray-800">{item.title}</h2>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
            <div className="space-x-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListingsPage;