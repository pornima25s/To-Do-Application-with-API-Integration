import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout, toggleTheme } from '../store/slices/authSlice';
import type { RootState } from '../store';
import { LogOut, Sun, Moon, Bell } from 'lucide-react';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-3`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            To Do
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            onClick={handleLogout}
            className={`p-2 rounded-lg ${
              theme === 'dark'
                ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;