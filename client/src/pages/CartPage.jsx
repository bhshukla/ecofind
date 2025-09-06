// src/pages/CartPage.jsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems } = useCart();

  // Calculate the total price
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

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
        <div>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center p-4 border rounded-lg shadow-sm bg-white">
                <img
                  src="https://via.placeholder.com/100"
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div className="flex-grow">
                  <h2 className="font-bold text-lg text-gray-800">{item.title}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary and Checkout Button */}
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
            <Link to="/checkout">
              <button className="w-full mt-6 bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;