import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTask, toggleTask, updateTaskPriority } from '../store/slices/tasksSlice';
import type { RootState } from '../store';
import { Star, Plus, Bell, Calendar, RotateCcw, X, Trash2 } from 'lucide-react';

interface TaskListProps {
  filter: 'all' | 'today' | 'important' | 'planned' | 'assigned';
}

const TaskList: React.FC<TaskListProps> = ({ filter }) => {
  const tasks = useSelector((state: RootState) => {
    const allTasks = state.tasks.tasks;
    const today = new Date().toISOString().split('T')[0];

    switch (filter) {
      case 'today':
        return allTasks.filter(task => task.createdAt.startsWith(today));
      case 'important':
        return allTasks.filter(task => task.priority === 'high');
      case 'planned':
        return allTasks.filter(task => task.dueDate);
      case 'assigned':
        return allTasks.filter(task => task.assignedTo);
      default:
        return allTasks;
    }
  });
  
  const theme = useSelector((state: RootState) => state.auth.theme);
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = React.useState<string | null>(null);

  const handleTaskClick = (taskId: string) => {
    setSelectedTask(taskId === selectedTask ? null : taskId);
  };

  return (
    <div className="flex">
      <div className={`flex-1 rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <div 
              key={task.id} 
              className={`p-4 cursor-pointer ${selectedTask === task.id ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50') : ''}`}
              onClick={() => handleTaskClick(task.id)}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => dispatch(toggleTask(task.id))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  onClick={(e) => e.stopPropagation()}
                />
                <span
                  className={`ml-3 flex-1 ${
                    task.completed
                      ? 'line-through text-gray-500'
                      : theme === 'dark'
                      ? 'text-white'
                      : 'text-gray-900'
                  }`}
                >
                  {task.title}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(updateTaskPriority({ id: task.id, priority: task.priority === 'high' ? 'medium' : 'high' }));
                  }}
                  className={`p-1 rounded-lg ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Star className={`h-5 w-5 ${task.priority === 'high' ? 'fill-current text-yellow-400' : ''}`} />
                </button>
              </div>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className={`p-4 text-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              No tasks found for this view.
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      {selectedTask && (
        <div className={`w-64 ml-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-4`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Created Today
            </span>
            <div className="flex space-x-2">
              <button className="text-gray-400 hover:text-gray-300">
                <X className="h-4 w-4" onClick={() => setSelectedTask(null)} />
              </button>
              <button className="text-gray-400 hover:text-gray-300">
                <Trash2 className="h-4 w-4" onClick={() => {
                  dispatch(removeTask(selectedTask));
                  setSelectedTask(null);
                }} />
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className={`w-full flex items-center p-2 rounded-lg ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <Plus className="h-4 w-4 mr-2" />
              <span>Add Step</span>
            </button>
            
            <button className={`w-full flex items-center p-2 rounded-lg ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <Bell className="h-4 w-4 mr-2" />
              <span>Set Reminder</span>
            </button>
            
            <button className={`w-full flex items-center p-2 rounded-lg ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <Calendar className="h-4 w-4 mr-2" />
              <span>Add Due Date</span>
            </button>
            
            <button className={`w-full flex items-center p-2 rounded-lg ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <RotateCcw className="h-4 w-4 mr-2" />
              <span>Repeat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;