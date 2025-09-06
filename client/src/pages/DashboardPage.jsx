// src/pages/DashboardPage.jsx
import { useAuth } from '../context/AuthContext';

function DashboardPage() {
  const { user } = useAuth(); // Get user data from context

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="text-lg mb-2"><strong>Username:</strong> {user.username}</p>
        <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        {/* We can add an edit button here later */}
      </div>
    </div>
  );
}

export default DashboardPage;