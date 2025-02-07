import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors("");
  };

const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.email || !formData.password) {
      setErrors("All fields are required");
      setTimeout(() => {
        setErrors("");
      }, 3000);
      return;
    }
    console.log("Form Data:", formData);
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-emerald-50 to-teal-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg m-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-emerald-800">Create Account</h2>
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
                placeholder="Create a password"
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
          {errors && <p className="text-red-500 text-sm text-center">{errors}</p>}
          <button 
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition duration-200 text-lg font-semibold mt-6"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-600 hover:text-emerald-800 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
