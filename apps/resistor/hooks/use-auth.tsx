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
import jwt_decode from 'jwt-decode';
import { useToast } from '@chakra-ui/react';
import axios from '../utils/axios';

export interface IAuthContext {
  userId?: number;
  login: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);

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
    setAuthToken(null);
    setUserId(null);
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
  }, [loginMutation.isError, toast, logout]);

  useEffect(() => {
    if (loginMutation.isSuccess) {
      setIsAuthenticated(true);
      setAuthToken(loginMutation.data.data.access);
      localStorage.setItem('token', loginMutation.data.data.access);
      localStorage.setItem('refresh_token', loginMutation.data.data.refresh);
    }
  }, [loginMutation.isSuccess, loginMutation.data]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (authToken) {
      const decoded: Record<string, any> = jwt_decode(authToken);
      setUserId(decoded.user_id);
      const expirationTime = new Date(decoded.exp * 1000);
      if (expirationTime < new Date()) {
        axios
          .post('/auth/refresh/', {
            refresh: localStorage.getItem('refresh_token'),
          })
          .then((response) => {
            setAuthToken(response.data.access);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
          });
      }
    }
  }, [authToken]);

  const value: IAuthContext = useMemo(
    () => ({
      userId,
      login,
      logout,
      isAuthenticated,
      isLoading: loginMutation.isLoading,
    }),
    [isAuthenticated, login, logout, loginMutation.isLoading, userId]
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
