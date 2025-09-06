// src/pages/AddProductPage.jsx
import { useState } from 'react';

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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Add a New Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Product Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price (₹)</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600"
          >
            Submit Listing
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProductPage;