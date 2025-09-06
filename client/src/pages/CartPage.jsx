// src/pages/CartPage.jsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty.{' '}
          <Link to="/" className="text-green-500 hover:underline">
            Continue Shopping
          </Link>
        </p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center p-4 border rounded-lg shadow-sm bg-white">
              {/* Image Placeholder */}
              <img
                src="https://via.placeholder.com/100" // A generic placeholder image
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              {/* Item Details */}
              <div className="flex-grow">
                <h2 className="font-bold text-lg text-gray-800">{item.title}</h2>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              {/* We can add a "Remove" button here later */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;