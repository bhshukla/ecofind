import { useState, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';

// This is an inline SVG for the leaf icon.
const LeafIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 text-green-700"
  >
    <path d="M12 19c-1.4 0-2.4-1.2-3.2-2.8A5.4 5.4 0 0 1 2 12c.5-1.5 2.1-2.9 4.2-3.5 1-.3 2.2-.5 3.5-.5h2.5c1.3 0 2.5.2 3.5.5 2.1.6 3.7 2 4.2 3.5a5.4 5.4 0 0 1-6.8 6.2z" />
    <path d="M11 19a1 1 0 1 1-2 0" />
    <path d="M13 19a1 1 0 1 1-2 0" />
    <path d="M15 19a1 1 1 1-2 0" />
    <path d="M12 21a1 1 0 1 1-2 0" />
  </svg>
);

// --- MOCK COMPONENTS FOR STANDALONE EXECUTION ---
// Mock react-router-dom context
const RouterContext = createContext({
  basename: '/',
  location: { pathname: '/signup', search: '', hash: '', state: null, key: 'default' },
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
// --- END MOCK COMPONENTS ---

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Signing up with:', { username, email, password });
    // This is where you would add your backend API call.
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-8">
        <div className="text-center mb-8 space-y-4">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <LeafIcon />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Create Your Account</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Join EcoFinds and start your sustainable shopping journey today.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-50 bg-white dark:bg-neutral-800 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-50 bg-white dark:bg-neutral-800 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-neutral-50 bg-white dark:bg-neutral-800 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-6">
          Already have an account?{' '}
          <MockLink to="/login" className="text-green-600 dark:text-green-400 hover:underline font-medium">
            Login
          </MockLink>
        </p>
      </div>
    </div>
  );
}

// Main App component to wrap the SignUpPage with the necessary contexts
export default function App() {
  return (
    <MockBrowserRouter>
      <SignUpPage />
    </MockBrowserRouter>
  );
}
