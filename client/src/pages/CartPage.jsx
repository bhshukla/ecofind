import { useState, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';

// Inline SVGs for icons used in the lovable.ai design.
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-700">
    <path d="M12 19c-1.4 0-2.4-1.2-3.2-2.8A5.4 5.4 0 0 1 2 12c.5-1.5 2.1-2.9 4.2-3.5 1-.3 2.2-.5 3.5-.5h2.5c1.3 0 2.5.2 3.5.5 2.1.6 3.7 2 4.2 3.5a5.4 5.4 0 0 1-6.8 6.2z" />
    <path d="M11 19a1 1 0 1 1-2 0" />
    <path d="M13 19a1 1 0 1 1-2 0" />
    <path d="M15 19a1 1 1 1-2 0" />
    <path d="M12 21a1 1 0 1 1-2 0" />
  </svg>
);

const Trash2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-red-500 hover:text-red-700">
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// --- MOCK COMPONENTS FOR STANDALONE EXECUTION ---
const CartContext = createContext();

const mockCartItems = [
  { id: 1, title: 'Vintage Wooden Chair', price: 89.99, image: 'https://placehold.co/100x100/D1D5DB/0A0A0A?text=Chair' },
  { id: 2, title: 'Classic Literature Collection', price: 45.50, image: 'https://placehold.co/100x100/F3F4F6/0A0A0A?text=Books' },
  { id: 3, title: 'Handcrafted Ceramic Vase', price: 32.00, image: 'https://placehold.co/100x100/E5E7EB/0A0A0A?text=Vase' },
];

export const useCart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const addToCart = (product) => {
    setCartItems(prevItems => [...prevItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const value = { cartItems, addToCart, removeFromCart };
  
  return useContext(CartContext) || value;
};

const RouterContext = createContext({
  basename: '/',
  location: { pathname: '/cart', search: '', hash: '', state: null, key: 'default' },
  navigate: () => {},
  routes: [],
  matches: [],
});

const MockLink = ({ to, ...props }) => {
  const context = useContext(RouterContext);
  if (!context) {
    return <a href={to} {...props}>{props.children}</a>;
  }
  return <a href={to} {...props} />;
};

const MockBrowserRouter = ({ children }) => {
  return (
    <RouterContext.Provider value={{}}>
      {children}
    </RouterContext.Provider>
  );
};

const MockNavbar = () => (
  <header className="py-4 border-b border-gray-200 dark:border-neutral-800">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <LeafIcon className="w-8 h-8 text-green-600" />
        <span className="text-xl font-bold text-neutral-900 dark:text-neutral-50">EcoFinds</span>
      </div>
      <nav className="space-x-4">
        <MockLink to="/" className="text-neutral-600 dark:text-neutral-400 hover:text-green-600">My Listings</MockLink>
        <MockLink to="/cart" className="text-neutral-600 dark:text-neutral-400 hover:text-green-600">Cart</MockLink>
        <MockLink to="/login" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Login</MockLink>
      </nav>
    </div>
  </header>
);
// --- END MOCK COMPONENTS ---

function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 9.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MockNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-8">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800">
            <p className="text-neutral-500 dark:text-neutral-400 text-lg mb-4">Your cart is empty</p>
            <MockLink to="/" className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200">
              Continue Shopping
            </MockLink>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-neutral-900 dark:text-neutral-50 mb-1">{item.title}</h3>
                      <p className="text-green-600 dark:text-green-400 font-bold">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="h-8 w-8 border border-neutral-300 dark:border-neutral-700 rounded-md flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200">
                        <MinusIcon />
                      </button>
                      <span className="w-8 text-center font-medium text-neutral-900 dark:text-neutral-50">1</span>
                      <button className="h-8 w-8 border border-neutral-300 dark:border-neutral-700 rounded-md flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200">
                        <PlusIcon />
                      </button>
                    </div>
                    
                    <button onClick={() => removeFromCart(item.id)} className="p-2 text-neutral-500 hover:text-red-600 transition-colors duration-200">
                      <Trash2Icon />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-800 sticky top-8">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 my-2"></div>
                  <div className="flex justify-between text-lg font-bold text-neutral-900 dark:text-neutral-50 pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <MockLink to="/checkout" className="w-full mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 text-center">
                  Proceed to Checkout
                </MockLink>
                <MockLink to="/" className="w-full mt-3 inline-block px-6 py-3 bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 text-center">
                  Continue Shopping
                </MockLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MockBrowserRouter>
      <CartPage />
    </MockBrowserRouter>
  );
}