// src/pages/ProductDetailPage.jsx
import { useParams } from 'react-router-dom';
import { products } from '../mockData';
import { useCart } from '../context/CartContext'; // 1. Import useCart

function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart(); // 2. Get the addToCart function
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found!</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 h-96 bg-gray-200 flex items-center justify-center rounded-lg">
          <span className="text-gray-500 text-2xl">Image</span>
        </div>
        <div className="md:w-1/2 md:pl-10 mt-6 md:mt-0">
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-3xl text-green-600 font-semibold mb-6">₹{product.price}</p>
          <p className="text-gray-700 mb-6">
            This is a detailed description of the product.
          </p>
          {/* 3. Attach the function to the button's onClick event */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-500 text-white p-3 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;