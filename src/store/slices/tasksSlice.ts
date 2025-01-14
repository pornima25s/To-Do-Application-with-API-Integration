import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Task, TasksState } from '../../types';

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  filter: 'all',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    updateTaskPriority: (state, action: PayloadAction<{ id: string; priority: Task['priority'] }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
      }
    },
    setFilter: (state, action: PayloadAction<'all' | 'today' | 'important' | 'planned' | 'assigned'>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, removeTask, toggleTask, updateTaskPriority, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;