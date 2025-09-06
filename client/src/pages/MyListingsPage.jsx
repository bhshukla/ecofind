import { Link } from 'react-router-dom';
import { useState } from 'react';

// --- MOCK COMPONENTS FOR STANDALONE EXECUTION ---
const MockLink = ({ to, ...props }) => {
  return <a href={to} {...props} />;
};
const MockBrowserRouter = ({ children }) => {
  return (
    <div>
      {children}
    </div>
  );
};
// Inline SVGs for icons
const Plus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);
const Edit = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);
const Trash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </svg>
);
const products = [{
  id: 1,
  title: "Vintage Wooden Chair",
  price: 89.99
}, {
  id: 2,
  title: "Classic Literature Collection",
  price: 45.50
}, {
  id: 3,
  title: "Handcrafted Ceramic Vase",
  price: 32.00
}, ];
// --- END MOCK COMPONENTS ---

function MyListingsPage() {
  const [myListings, setMyListings] = useState(products.slice(0, 2));

  const handleEdit = (id) => {
    console.log("Editing product with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Deleting product with ID:", id);
    setMyListings(myListings.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">My Listings</h1>
          <MockLink
            to="/add-product"
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <Plus />
            <span>Add New Product</span>
          </MockLink>
        </div>
        <div className="space-y-4">
          {myListings.length === 0 ? (
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg text-center">
              <p className="text-neutral-600 dark:text-neutral-400">You have no active listings.</p>
              <MockLink
                to="/add-product"
                className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Start Listing
              </MockLink>
            </div>
          ) : (
            myListings.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-center p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-sm bg-white dark:bg-neutral-800">
                <img
                  src="https://placehold.co/100x100/216f46/f9fafb?text=Product"
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md mr-4 mb-4 sm:mb-0"
                />
                <div className="flex-grow text-center sm:text-left">
                  <h2 className="font-bold text-lg text-neutral-900 dark:text-neutral-50">{item.title}</h2>
                  <p className="text-neutral-600 dark:text-neutral-400">₹{item.price}</p>
                </div>
                <div className="flex space-x-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600 transition-colors"
                  >
                    <Edit />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex items-center space-x-1 bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition-colors"
                  >
                    <Trash />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MockBrowserRouter>
      <MyListingsPage />
    </MockBrowserRouter>
  );
}
