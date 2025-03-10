import React,{ useState } from "react";

function PasswordValidator() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shake, setShake] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    number: false,
    special: false,
    capital: false,
    lowercase: false,
  });

  const validatePassword = (value) => {
    setPassword(value);
    setValidations({
      length: value.length >= 6,
      number: /\d/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      capital: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (!Object.values(validations).every(Boolean)) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setPassword('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  const allValid = Object.values(validations).every(Boolean);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-cyan-200">
      {showSuccess ? (
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Success! 🎉</h2>
          <p className="text-xl text-gray-700">Password has been validated</p>
        </div>
      ) : (
        <div className={`bg-white p-8 rounded-xl shadow-2xl w-full max-w-md ${shake ? 'shake' : ''}`}>
          <h2 className="text-3xl font-bold text-teal-800 mb-6 text-center">Password Validator</h2>
          <div className="mb-6 relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => validatePassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 px-3 py-1 text-teal-600 hover:text-teal-800 font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {isSubmitted && (
            <div className="space-y-2 mb-6">
              <div
                className={`p-3 rounded-lg flex items-center ${
                  validations.length 
                    ? "bg-green-50 text-green-600" 
                    : "bg-red-50 text-red-600"
                }`}
              >
                {validations.length ? "✓" : "×"} Minimum 6 characters
              </div>
              <div
                className={`p-3 rounded-lg flex items-center ${
                  validations.number 
                    ? "bg-green-50 text-green-600" 
                    : "bg-red-50 text-red-600"
                }`}
              >
                {validations.number ? "✓" : "×"} Contains a number
              </div>
              <div
                className={`p-3 rounded-lg flex items-center ${
                  validations.special 
                    ? "bg-green-50 text-green-600" 
                    : "bg-red-50 text-red-600"
                }`}
              >
                {validations.special ? "✓" : "×"} Contains a special character
              </div>
              <div
                className={`p-3 rounded-lg flex items-center ${
                  validations.capital 
                    ? "bg-green-50 text-green-600" 
                    : "bg-red-50 text-red-600"
                }`}
              >
                {validations.capital ? "✓" : "×"} Contains a capital letter
              </div>
              <div
                className={`p-3 rounded-lg flex items-center ${
                  validations.lowercase 
                    ? "bg-green-50 text-green-600" 
                    : "bg-red-50 text-red-600"
                }`}
              >
                {validations.lowercase ? "✓" : "×"} Contains a lowercase letter
              </div>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-teal-500 text-white py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors text-lg font-semibold"
          >
            Validate Password
          </button>
        </div>
      )}
    </div>
  );
}

export default PasswordValidator;
