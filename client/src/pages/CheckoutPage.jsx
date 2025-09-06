// src/pages/CheckoutPage.jsx
import { useState } from 'react';

function CheckoutPage() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Order placed successfully! (This is a demo)');
    console.log('Checkout details:', { address, phone });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Delivery Address</label>
            <textarea
              id="address"
              rows="4"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border rounded-lg"
              required
            />
          </div>
          <p className="text-gray-600 mb-6 text-center">Payment method integration would go here.</p>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;