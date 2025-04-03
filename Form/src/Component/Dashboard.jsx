import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Not authenticated');
        }
        
        
        setLoading(false);
      } catch (error) {
        console.error('Authentication error:', error);
        setError('Authentication failed. Please log in again.');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      localStorage.removeItem('user');
      
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-emerald-50 to-teal-100">
        <div className="text-emerald-800 text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-emerald-50 to-teal-100">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-emerald-50 to-teal-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg m-4 text-center">
        <h1 className="text-3xl font-bold text-emerald-800 mb-6">Welcome!</h1>
        
        <div className="bg-emerald-50 p-6 rounded-lg mb-6">
          <p className="text-gray-700 text-xl mb-4">
            You have logged in successfully!
          </p>
          <p className="text-gray-600">
            This is a protected route that only authenticated users can access.
          </p>
        </div>
        
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
