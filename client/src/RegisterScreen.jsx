import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from './api/axios'; 

function RegisterScreen() {
  const [loginActive, setLoginActive] = useState(true);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [hall, setHall] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormToggle = (loginSelected) => {
    setLoginActive(loginSelected);
    setError('');
    setSuccess('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      setLoading(true);
      const response = await API.post("/auth/register", {
        name,
        rollNumber,
        hall,
        phoneNumber,
        email,
        password,
        confirmPassword,
      });

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("userRole", response.data.role || "student"); 

      setSuccess('Registration successful!');
      navigate('/success', { state: { name: name } });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setLoading(true);
      const response = await API.post('/auth/login', {
        rollNumber,
        password,
      });

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("userRole", response.data.user.role || "student"); 

      setSuccess('Login successful!');
      navigate('/main', { state: { id: response.data.id } });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 font-sans">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Toggle Controls */}
        <div className="flex border border-gray-300 rounded-xl mb-6 overflow-hidden">
          <button
            onClick={() => handleFormToggle(true)}
            className={`w-1/2 py-2 text-lg font-medium transition ${
              loginActive ? 'bg-blue-600 text-white' : 'bg-white text-black'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleFormToggle(false)}
            className={`w-1/2 py-2 text-lg font-medium transition ${
              !loginActive ? 'bg-blue-600 text-white' : 'bg-white text-black'
            }`}
          >
            Signup
          </button>
        </div>

        {/* Forms */}
        {loginActive ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Registration No."
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Login'}
            </button>
            <p className="text-center text-sm">
              Not a member?{' '}
              <button
                type="button"
                onClick={() => handleFormToggle(false)}
                className="text-blue-600 underline"
              >
                Signup now
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Registration No."
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Hostel you are in"
              value={hall}
              onChange={(e) => setHall(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Signup'}
            </button>
          </form>
        )}

        {/* Error / Success */}
        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-100 border border-red-400 text-red-700 text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 p-3 rounded-lg bg-green-100 border border-green-400 text-green-700 text-center">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}

export default RegisterScreen;
