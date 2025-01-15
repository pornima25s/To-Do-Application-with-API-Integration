import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

const AllTasks = () => {
  const theme = useSelector((state: RootState) => state.auth.theme);

  return (
    <div className="p-6">
      <h1 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        All Tasks
      </h1>
      <TaskInput />
      <TaskList filter="all" />
    </div>
  );
};

export default AllTasks;