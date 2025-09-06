import { useState, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';

// Inline SVGs for icons
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-green-600">
    <path d="M12 19c-1.4 0-2.4-1.2-3.2-2.8A5.4 5.4 0 0 1 2 12c.5-1.5 2.1-2.9 4.2-3.5 1-.3 2.2-.5 3.5-.5h2.5c1.3 0 2.5.2 3.5.5 2.1.6 3.7 2 4.2 3.5a5.4 5.4 0 0 1-6.8 6.2z" />
    <path d="M11 19a1 1 0 1 1-2 0" />
    <path d="M13 19a1 1 0 1 1-2 0" />
    <path d="M15 19a1 1 1 1-2 0" />
    <path d="M12 21a1 1 0 1 1-2 0" />
  </svg>
);

const ShoppingCartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-1">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 12.06a2 2 0 0 0 1.95 1.94h9.8a2 2 0 0 0 1.95-1.94L23 6H6" />
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// --- MOCK COMPONENTS FOR STANDALONE EXECUTION ---
const AuthContext = createContext();
const RouterContext = createContext({
  basename: '/',
  location: { pathname: '/', search: '', hash: '', state: null, key: 'default' },
  navigate: () => {},
  routes: [],
  matches: [],
});

export const useAuth = () => {
  const [user, setUser] = useState({ username: 'Jane Doe' });

  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    setUser(null);
  };

  const value = { user, login, logout };
  return useContext(AuthContext) || value;
};

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
// --- END MOCK COMPONENTS ---

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    alert("You have been logged out.");
  };

  return (
    <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <MockLink to="/" className="flex items-center space-x-2 transition-opacity duration-200">
            <LeafIcon />
            <span className="font-bold text-xl text-neutral-900 dark:text-neutral-50">EcoFinds</span>
          </MockLink>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <MockLink to="/my-listings" className="text-neutral-600 dark:text-neutral-400 hover:text-green-600 transition-colors duration-200 font-medium hidden md:block">
              My Listings
            </MockLink>
            <MockLink to="/cart" className="flex items-center space-x-1 text-neutral-600 dark:text-neutral-400 hover:text-green-600 transition-colors duration-200">
              <ShoppingCartIcon />
              <span className="font-medium hidden md:block">Cart</span>
            </MockLink>

            {/* Login/User Button */}
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <span className="text-neutral-700 dark:text-neutral-300 font-semibold hidden md:block">Hi, {user.username}</span>
                  <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition-colors duration-200">
                    Logout
                  </button>
                </>
              ) : (
                <MockLink to="/login" className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors duration-200">
                  <UserIcon />
                  Login
                </MockLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <MockBrowserRouter>
      <Navbar />
    </MockBrowserRouter>
  );
}
