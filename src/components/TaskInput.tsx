import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../store/slices/tasksSlice';
import { Bell, RotateCcw, Calendar } from 'lucide-react';
import type { RootState } from '../store';

const TaskInput = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.auth.theme);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      dispatch(
        addTask({
          id: Date.now().toString(),
          title: title.trim(),
          priority,
          completed: false,
          createdAt: new Date().toISOString(),
        })
      );
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add A Task"
            className={`flex-1 bg-transparent border-none focus:ring-0 ${
              theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
            }`}
          />
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className={`p-2 rounded-lg ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              type="button"
              className={`p-2 rounded-lg ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <button
              type="button"
              className={`p-2 rounded-lg ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-5 w-5" />
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              ADD TASK
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;