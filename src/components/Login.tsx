import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import type { RootState } from '../store';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, theme } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      if (email && password && username) {
        const mockUser = {
          id: '1',
          email,
          username,
          name: username,
        };
        dispatch(loginSuccess(mockUser));
        navigate('/dashboard');
      } else {
        throw new Error('All fields are required');
      }
    } catch (err) {
      dispatch(loginFailure(err instanceof Error ? err.message : 'Login failed'));
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className={`mx-auto h-12 w-12 flex items-center justify-center rounded-full ${theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'}`}>
            <LogIn className={`h-6 w-6 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                type="text"
                required
                className={`appearance-none rounded-t-md relative block w-full px-3 py-2 border ${
                  theme === 'dark' ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                required
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  theme === 'dark' ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                required
                className={`appearance-none rounded-b-md relative block w-full px-3 py-2 border ${
                  theme === 'dark' ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;