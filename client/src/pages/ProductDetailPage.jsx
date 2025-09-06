import { useState, createContext, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

// Inline SVGs for the icons
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 12.06a2 2 0 0 0 1.95 1.94h9.8a2 2 0 0 0 1.95-1.94L23 6H6" />
  </svg>
);

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-neutral-500 group-hover:text-red-500">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// --- MOCK COMPONENTS FOR STANDALONE EXECUTION ---
const CartContext = createContext();

export const useCart = () => {
  const addToCart = (product) => {
    alert(`${product.title} has been added to the cart!`);
  };
  return useContext(CartContext) || { addToCart };
};

const RouterContext = createContext({
  basename: '/',
  location: { pathname: '/product/1', search: '', hash: '', state: null, key: 'default' },
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

const mockProducts = [
  {
    id: 1,
    title: 'Vintage Wooden Chair',
    price: 89.99,
    image: 'https://placehold.co/700x700/D4D4D8/0A0A0A?text=Chair',
    description: 'A beautiful vintage wooden chair with a classic woven seat. This piece has been lovingly maintained and shows minimal wear. Perfect for a dining room or as an accent piece. The warm wood tones and traditional craftsmanship make this a timeless addition to any home.',
    seller: 'Sarah M.',
    location: 'Portland, OR'
  },
  {
    id: 2,
    title: 'Classic Literature Collection',
    price: 45.50,
    image: 'https://placehold.co/700x700/D4D4D8/0A0A0A?text=Books',
    description: 'A collection of timeless literature classics, perfect for any bookshelf.',
    seller: 'John D.',
    location: 'New York, NY'
  },
];
// --- END MOCK COMPONENTS ---

function ProductDetailPage() {
  const { id } = useParams() || { id: "1" };
  const { addToCart } = useCart();
  const product = mockProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">Product not found!</h1>
          <MockLink to="/" className="text-green-600 dark:text-green-400 hover:underline">
            Go back to homepage
          </MockLink>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleMessageSeller = () => {
    alert(`Messaging the seller for ${product.title}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MockLink to="/" className="inline-flex items-center text-neutral-500 dark:text-neutral-400 hover:text-green-600 transition-colors duration-200 mb-6">
          <ArrowLeftIcon />
          Back to Products
        </MockLink>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
                {product.title}
              </h1>
              <div className="flex items-center justify-between mb-6">
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                  ₹{product.price.toFixed(2)}
                </p>
                <button className="group p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors duration-200">
                  <HeartIcon />
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-neutral-700 dark:text-neutral-300">Sold by {product.seller}</p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">{product.location}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600 dark:text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mr-2"></div>
                    Trusted Seller
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
                Description
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center p-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
              >
                <ShoppingCartIcon />
                Add to Cart
              </button>
              <button
                onClick={handleMessageSeller}
                className="w-full p-4 bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
              >
                Message Seller
              </button>
            </div>

            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-xl border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-3">
                <div className="bg-green-600 rounded-full p-2">
                  <HeartIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">Sustainable Choice</p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    By buying this pre-loved item, you're helping reduce waste and supporting a circular economy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <MockBrowserRouter>
      <ProductDetailPage />
    </MockBrowserRouter>
  );
}
