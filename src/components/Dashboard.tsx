import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import Header from './Header';
import CircularProgress from './CircularProgress';
import { ListChecks, Star, Calendar, UserSquare2 } from 'lucide-react';
import AllTasks from '../pages/AllTasks';
import TodayTasks from '../pages/TodayTasks';
import ImportantTasks from '../pages/ImportantTasks';
import PlannedTasks from '../pages/PlannedTasks';
import AssignedTasks from '../pages/AssignedTasks';

const Dashboard = () => {
  const { user, theme } = useSelector((state: RootState) => state.auth);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const navigate = useNavigate();
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.createdAt.startsWith(today));

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <div className={`w-64 flex-shrink-0 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="h-full flex flex-col">
          {/* User Profile */}
          <div className="p-4">
            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                alt="Profile"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Hey, {user?.username}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            <button
              onClick={() => navigate('/dashboard')}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${
                location.pathname === '/dashboard'
                  ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ListChecks className="mr-3 h-5 w-5" />
              All Tasks
            </button>
            <button
              onClick={() => navigate('/dashboard/today')}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${
                location.pathname === '/dashboard/today'
                  ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Today
            </button>
            <button
              onClick={() => navigate('/dashboard/important')}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${
                location.pathname === '/dashboard/important'
                  ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Star className="mr-3 h-5 w-5" />
              Important
            </button>
            <button
              onClick={() => navigate('/dashboard/planned')}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${
                location.pathname === '/dashboard/planned'
                  ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Planned
            </button>
            <button
              onClick={() => navigate('/dashboard/assigned')}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${
                location.pathname === '/dashboard/assigned'
                  ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <UserSquare2 className="mr-3 h-5 w-5" />
              Assigned to me
            </button>
          </nav>

          {/* Task Stats with Circular Progress */}
          <div className="p-4">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <h3 className={`text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>
                Today's Tasks
              </h3>
              <div className="text-2xl font-bold mb-4">{todayTasks.length}</div>
              <div className="flex justify-center">
                <CircularProgress completed={completedTasks} total={totalTasks} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Header />
        <Routes>
          <Route path="/" element={<AllTasks />} />
          <Route path="/today" element={<TodayTasks />} />
          <Route path="/important" element={<ImportantTasks />} />
          <Route path="/planned" element={<PlannedTasks />} />
          <Route path="/assigned" element={<AssignedTasks />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;