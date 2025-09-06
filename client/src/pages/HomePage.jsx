// src/pages/HomePage.jsx
import { useState, useEffect } from 'react'; // 1. Import useState and useEffect
import ProductCard from '../components/ProductCard';
import apiClient from '../services/api'; // 2. Import our new API client

// 3. We no longer need to import the fake data.

function HomePage() {
  const [products, setProducts] = useState([]); // State to hold products from the API
  const [loading, setLoading] = useState(true); // State to know when data is being fetched
  const [error, setError] = useState(null); // State to hold any errors

  // 4. useEffect runs once when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/api/products');
        setProducts(response.data); // Save the fetched products
      } catch (err) {
        setError('Failed to fetch products. Is the backend server running?');
        console.error(err);
      } finally {
        setLoading(false); // Stop loading, whether it succeeded or failed
      }
    };

    fetchProducts();
  }, []); // The empty array [] means this effect runs only once

  if (loading) return <div className="p-6">Loading products...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;