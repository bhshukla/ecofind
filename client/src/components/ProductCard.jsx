// src/components/ProductCard.jsx
import { Link } from 'react-router-dom'; // 1. Import Link

function ProductCard({ product }) {
  return (
    // 2. Wrap the whole div in a Link component
    <Link to={`/product/${product.id}`}>
      <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Image Placeholder */}
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">Image</span>
        </div>
        {/* Card Content */}
        <div className="p-4">
          <h3 className="font-bold text-lg truncate">{product.title}</h3>
          <p className="text-gray-700 mt-2">₹{product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;