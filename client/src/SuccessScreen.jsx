import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SuccessScreen() {
  const location = useLocation();
  const { name } = location.state || { name: 'User' };
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(countdown * 1000);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#003366] via-[#004080] via-[#0059b3] to-[#0073e6] font-sans">
      <div className="text-center bg-white p-10 rounded-xl shadow-xl animate-fadeIn max-w-md w-full">
        {/* Success Icon */}
        <div className="mb-6 animate-pop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            fill="#4CAF50"
            viewBox="0 0 24 24"
            className="mx-auto"
          >
            <path d="M20.285 6.709l-9.284 9.992-5.285-5.424 1.343-1.322 3.942 4.047 7.941-8.57 1.343 1.277zm1.715-4.709h-18v2h18v-2zm-18 18h18v-2h-18v2z" />
          </svg>
        </div>

        <h1
          className="text-3xl font-bold text-[#4CAF50] mb-2"
          role="alert"
        >
          Successfully Registered
        </h1>
        <p className="text-gray-700 text-xl">Welcome {name}!</p>
        <p className="text-gray-600 text-lg mt-2">
          Redirecting to login in {countdown} seconds...
        </p>

        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-2 bg-[#4CAF50] text-white rounded-lg shadow hover:bg-green-600 transition"
        >
          Go to Login Now
        </button>
      </div>
    </div>
  );
}

export default SuccessScreen;
