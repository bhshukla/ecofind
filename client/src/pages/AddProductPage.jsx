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
// --- END MOCK COMPONENTS ---

function AddProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting new product:', { title, price, description });
    // Later, we will add the code to talk to the backend here.
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center py-16">
      <div className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-2xl border border-neutral-200 dark:border-neutral-700">
        <h1 className="text-3xl font-bold mb-6 text-center text-neutral-900 dark:text-neutral-50">Add a New Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-neutral-700 dark:text-neutral-300 font-medium mb-2">Product Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-neutral-700 dark:text-neutral-300 font-medium mb-2">Price (₹)</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-neutral-700 dark:text-neutral-300 font-medium mb-2">Description</label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-green-600 transition-colors"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MockBrowserRouter>
      <AddProductPage />
    </MockBrowserRouter>
  );
}
