import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('https://reqres.in/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/users');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {/* 3D Card Container with shadow effects */}
      <div className="w-full max-w-md perspective">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl transform rotate-y-0 transition-all duration-500 hover:rotate-y-5">
          {/* Top accent bar */}
          <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          {/* 3D Floating Header */}
          <div className="relative -mt-10 mx-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-lg p-6 transform translate-y-0 hover:translate-y-1 transition-transform duration-300">
              <h1 className="text-2xl md:text-3xl font-bold text-white text-center">User Management</h1>
            </div>
          </div>
          
          <div className="px-8 pt-16 pb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-800">Welcome </h2>
              <p className="text-gray-500 mt-2">Please sign in to your account</p>
            </div>
            
            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                  <p className="flex items-center">
                    <span className="mr-2">⚠️</span> {error}
                  </p>
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg font-medium shadow-lg transform transition-all duration-300 ${isLoading ? 'opacity-75' : 'hover:-translate-y-1 hover:shadow-xl'}`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <span className="text-sm text-gray-600">
                
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium ml-1">
                  
                </a>
              </span>
            </div>
          </div>
          
          {/* Bottom decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path 
                fill="#4F46E5" 
                fillOpacity="0.05" 
                d="M0,192L60,176C120,160,240,128,360,138.7C480,149,600,203,720,202.7C840,203,960,149,1080,144C1200,139,1320,181,1380,202.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for 3D effects */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .rotate-y-5 {
          transform: rotateY(5deg);
        }
      `}</style>
    </div>
  );
};

export default Login;