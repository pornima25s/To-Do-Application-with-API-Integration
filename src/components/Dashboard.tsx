import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Header from './Header';
import CircularProgress from './CircularProgress';
import { ListChecks, Star, Calendar, UserSquare2 } from 'lucide-react';
import { setFilter } from '../store/slices/tasksSlice';

const Dashboard = () => {
  const { user, theme } = useSelector((state: RootState) => state.auth);
  const { tasks, filter } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const getFilteredTasks = () => {
    const today = new Date().toISOString().split('T')[0];
    switch (filter) {
      case 'today':
        return tasks.filter(task => task.createdAt.startsWith(today));
      case 'important':
        return tasks.filter(task => task.priority === 'high');
      case 'planned':
        return tasks.filter(task => task.dueDate);
      case 'assigned':
        return tasks.filter(task => task.assignedTo);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

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
              onClick={() => dispatch(setFilter('all'))}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${
                filter === 'all'
                  ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ListChecks className="mr-3 h-5 w-5" />
              All Tasks
            </button>
            <button
              onClick={() => dispatch(setFilter('today'))}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${
                filter === 'today'
                  ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Today
            </button>
            <button
              onClick={() => dispatch(setFilter('important'))}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${
                filter === 'important'
                  ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Star className="mr-3 h-5 w-5" />
              Important
            </button>
            <button
              onClick={() => dispatch(setFilter('planned'))}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${
                filter === 'planned'
                  ? theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  : theme === 'dark' ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Planned
            </button>
            <button
              onClick={() => dispatch(setFilter('assigned'))}
              className={`w-full flex items-center px-3 py-2 rounded-lg ${
                filter === 'assigned'
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
                Today Tasks
              </h3>
              <div className="text-2xl font-bold mb-4">{filteredTasks.length}</div>
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
        <main className="p-6">
          <TaskInput />
          <TaskList />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;