import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setErrors("All fields are required");
      setTimeout(() => {
        setErrors("");
      }, 3000);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      
      console.log('Registration successful:', data);
      
      localStorage.setItem('user', JSON.stringify(data.user));
      
      navigate('/dashboard');
      
    } catch (error) {
      setErrors(error.message);
      setTimeout(() => {
        setErrors("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-emerald-50 to-teal-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg m-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-800">
          Create an Account
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-emerald-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {errors && (
            <p className="text-red-500 text-sm text-center">{errors}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition duration-200 text-lg font-semibold mt-2 cursor-pointer disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-emerald-600 hover:text-emerald-800 font-medium"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
