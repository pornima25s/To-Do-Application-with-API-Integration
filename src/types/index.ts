export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  assignedTo?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  theme: 'light' | 'dark';
}

export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: 'all' | 'today' | 'important' | 'planned' | 'assigned';
}