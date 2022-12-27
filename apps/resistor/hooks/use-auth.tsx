/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation } from '@tanstack/react-query';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';
import axios from '../utils/axios';
import { useToast } from '@chakra-ui/react';

export interface IAuthContext {
  user?: any;
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toast = useToast();

  const loginMutation = useMutation({
    mutationFn: (credentials) => {
      return axios.post('/auth/login/', credentials);
    },
  });

  const login = useCallback(
    (username: string, password: string) => {
      //@ts-ignore
      return loginMutation.mutate({
        username,
        password,
      });
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    if (loginMutation.isError) {
      toast({
        title: 'An error occurred.',
        description: 'Please check your credentials and try again.',
        status: 'error',
        duration: 3000,
        isClosable: false,
        position: 'bottom-left',
      });
      logout();
    }
  }, [loginMutation.isError, toast]);

  useEffect(() => {
    if (loginMutation.isSuccess) {
      setIsAuthenticated(true);
      localStorage.setItem('token', loginMutation.data.data.access);
    }
  }, [loginMutation.isSuccess, loginMutation.data]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const value: IAuthContext = useMemo(
    () => ({
      user: null,
      login,
      logout,
      isAuthenticated,
      isLoading: loginMutation.isLoading,
    }),
    [isAuthenticated, login, logout, loginMutation.isLoading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
