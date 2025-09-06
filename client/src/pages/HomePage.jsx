import { useState, useEffect, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';

// Inline SVGs for icons used in the lovable.ai design.
const LeafIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-green-600"
  >
    <path d="M12 19c-1.4 0-2.4-1.2-3.2-2.8A5.4 5.4 0 0 1 2 12c.5-1.5 2.1-2.9 4.2-3.5 1-.3 2.2-.5 3.5-.5h2.5c1.3 0 2.5.2 3.5.5 2.1.6 3.7 2 4.2 3.5a5.4 5.4 0 0 1-6.8 6.2z" />
    <path d="M11 19a1 1 0 1 1-2 0" />
    <path d="M13 19a1 1 0 1 1-2 0" />
    <path d="M15 19a1 1 1 1-2 0" />
    <path d="M12 21a1 1 0 1 1-2 0" />
  </svg>
);

const RecycleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-green-600"
  >
    <path d="M12 21a9 9 0 1 0-9-9c0 1.25.7 2.41 1.8 3.34L8 16m2.5-10.5L16 16m-6-10h6v6m0-6L8 16" />
    <path d="M16 16c2.75-.42 5-2.75 5-5a5 5 0 0 0-5-5c-2.75-.42-5-2.75-5-5a5 5 0 0 0-5 5c-2.75.42-5 2.75-5 5a5 5 0 0 0 5 5c2.75.42 5 2.75 5 5a5 5 0 0 0 5-5" />
    <path d="M10 10.5L4 12" />
    <path d="M14 10.5L18 12" />
    <path d="M16 16L12 18" />
    <path d="M8 16L10 18" />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-green-600"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// --- MOCK COMPONENTS FOR STANDALONE EXECUTION ---
// These are mock components to make the file runnable in isolation.
// In your actual project, you would use your existing imports.

const RouterContext = createContext({
  basename: '/',
  location: { pathname: '/', search: '', hash: '', state: null, key: 'default' },
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

// Mock `apiClient` to simulate a network request.
// This mock returns an array of products.
const apiClient = {
  get: (url) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === '/api/products') {
          resolve({
            data: [
              { id: 1, name: 'Vintage Wooden Chair', price: 89.99, image: 'https://placehold.co/600x400/E5E7EB/1F2937?text=Chair' },
              { id: 2, name: 'Classic Literature Collection', price: 45.50, image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Books' },
              { id: 3, name: 'Handcrafted Ceramic Vase', price: 32.00, image: 'https://placehold.co/600x400/F3F4F6/1F2937?text=Vase' },
              { id: 4, name: 'Reclaimed Wood Table', price: 250.00, image: 'https://placehold.co/600x400/E5E7EB/1F2937?text=Table' },
              { id: 5, name: 'Antique Desk Lamp', price: 75.00, image: 'https://placehold.co/600x400/D1D5DB/1F2937?text=Lamp' },
              { id: 6, name: 'Woven Storage Basket', price: 25.00, image: 'https://placehold.co/600x400/F3F4F6/1F2937?text=Basket' },
            ],
          });
        } else {
          reject(new Error('API call failed'));
        }
      }, 1000);
    });
  },
};

// Mock `ProductCard` component since its code was not provided.
const ProductCard = ({ product }) => (
  <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl">
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-50 mb-1">{product.name}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        <span className="font-semibold text-green-600 dark:text-green-400">${product.price.toFixed(2)}</span>
      </p>
    </div>
  </div>
);

// Mock Navbar component
const MockNavbar = () => (
  <header className="py-4 border-b border-gray-200 dark:border-neutral-800">
    <div className="container mx-auto px-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <LeafIcon className="w-8 h-8 text-green-600" />
        <span className="text-xl font-bold text-neutral-900 dark:text-neutral-50">EcoFinds</span>
      </div>
      <nav className="space-x-4">
        <MockLink to="/" className="text-neutral-600 dark:text-neutral-400 hover:text-green-600">My Listings</MockLink>
        <MockLink to="/" className="text-neutral-600 dark:text-neutral-400 hover:text-green-600">Cart</MockLink>
        <MockLink to="/login" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Login</MockLink>
      </nav>
    </div>
  </header>
);
// --- END MOCK COMPONENTS ---

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This is your original logic to fetch products from the API.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiClient.get('/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products. Is the backend server running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="p-6 text-center text-lg">Loading products...</div>;
  if (error) return <div className="p-6 text-red-500 text-center">{error}</div>;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <MockNavbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white dark:from-neutral-900 dark:to-neutral-950 opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight">
                  Find Sustainable
                  <span className="text-green-600 block">Treasures</span>
                </h1>
                <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-lg">
                  Discover beautiful pre-loved items and give them a new life. Join our community of conscious consumers building a more sustainable future.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <MockLink to="/signup" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200 text-center">
                  Start Shopping
                </MockLink>
                <MockLink to="/add-product" className="px-6 py-3 bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 text-center">
                  Sell Items
                </MockLink>
              </div>
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <LeafIcon />
                  </div>
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Eco-Friendly</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <RecycleIcon />
                  </div>
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Sustainable</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                    <HeartIcon />
                  </div>
                  <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Community</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://placehold.co/700x500/D4D4D8/0A0A0A?text=Sustainable+Marketplace"
                alt="Sustainable marketplace"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-16 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 mb-4">
              Featured Treasures
            </h2>
            <p className="text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto">
              Discover unique, pre-loved items that are looking for their next adventure.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <MockLink to="/products" className="px-6 py-3 bg-transparent border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 inline-block">
              View All Products
            </MockLink>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function App() {
  return (
    <MockBrowserRouter>
      <HomePage />
    </MockBrowserRouter>
  );
}