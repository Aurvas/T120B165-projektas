import React, { createContext, ReactNode, useState } from 'react';
import { IUser, UserContextType } from '../models/User';
import LoginData from '../models/LoginData';
import { AuthService } from '../services/AuthService';
import SignupData from '../models/SignupData';
import User from '../../users/models/User';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext<UserContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  );

  const login = async (loginData: LoginData) => {
    const user = await AuthService.login(loginData);
    if (user.accessToken) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    }
    return user;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const signup = async (signupData: SignupData) => {
    const user = await AuthService.signup(signupData);
    if (user.accessToken) {
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    }
    return user;
  };

  const saveUser = async (user: User) => {
    const savedUser = await AuthService.saveUser(user);
    if (savedUser.accessToken) {
      localStorage.setItem('user', JSON.stringify(savedUser));
      setUser(savedUser);
    }
    return savedUser;
  };


  return (
    <AuthContext.Provider value={{ user, login, logout, signup, saveUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
