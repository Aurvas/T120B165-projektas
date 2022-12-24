import axios from 'axios';
import { API_URL } from '../../common/constants';
import SignupData from '../models/SignupData';
import LoginData from '../models/LoginData';
import User from '../../users/models/User';

export const signup = async (signupData: SignupData) => {
  const response = await axios.post(`${API_URL}/api/register`, signupData);
  return response.data;
};

export const login = async (loginData: LoginData) => {
  const response = await axios.post(`${API_URL}/api/login`, loginData);
  return response.data;
};

export const saveUser = async (user: User) => {
  let response;
  if (user.id) {
    response = await axios.put(`${API_URL}/api/users/${user.id}`, user);
  } else {
    response = await axios.post(`${API_URL}/api/users`, user);
  }

  return response.data;
};


export const AuthService = { signup, login, saveUser };
