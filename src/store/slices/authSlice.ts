import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '../../types';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

const loadStoredAuth = (): Partial<AuthState> => {
  try {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const parsedAuth = JSON.parse(storedAuth);
      return {
        user: parsedAuth.user,
        isAuthenticated: parsedAuth.isAuthenticated,
      };
    }
  } catch (error) {
    console.error('Error loading stored auth:', error);
  }
  return {};
};

// Store registered users
const getRegisteredUsers = (): Record<string, User> => {
  try {
    const stored = localStorage.getItem('registeredUsers');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  theme: getInitialTheme(),
  ...loadStoredAuth(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('auth', JSON.stringify({
        user: action.payload,
        isAuthenticated: true,
      }));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      
      // Store the new user in registered users
      const registeredUsers = getRegisteredUsers();
      registeredUsers[action.payload.email] = action.payload;
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      localStorage.setItem('auth', JSON.stringify({
        user: action.payload,
        isAuthenticated: true,
      }));
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('auth');
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  toggleTheme,
} = authSlice.actions;

// Selector to check if a user is registered
export const isUserRegistered = (email: string): boolean => {
  const registeredUsers = getRegisteredUsers();
  return !!registeredUsers[email];
};

// Get registered user by email
export const getRegisteredUser = (email: string): User | null => {
  const registeredUsers = getRegisteredUsers();
  return registeredUsers[email] || null;
};

export default authSlice.reducer;