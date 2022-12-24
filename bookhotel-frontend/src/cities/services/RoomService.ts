import { API_URL } from '../../common/constants';
import React, { createContext, ReactNode, useState } from 'react';
import axios from 'axios';
import City from '../models/City';
import { AuthContext } from '../../authentication/context/AuthContext';
import { UserContextType } from '../../authentication/models/User';



export const getCities = async () => {
  const response = await axios.get(`${API_URL}/cities`);
  return response.data;
};

export const getCity = async ({ queryKey }: any) => {
  const [, id] = queryKey;
  const response = await axios.get(`${API_URL}/cities/${id}`);
  return response.data;
};

export const updateCity = async (id: string) => {
  const response = await axios.put(`${API_URL}/cities/${id}`);
  return response.data;
};
export const deleteCity = async (id: string) => {
  const response = await axios.delete(`${API_URL}/cities/${id}`);
  return response.data;
};

export const saveCity = async (city: City) => {
	localStorage.getItem('user');
	const config = {
    headers: { Authorization: localStorage.getItem('user')},
	
	};
	
    const response = await axios.post(`${API_URL}/cities`, city, config);


  return response.data;
};

export default { getCities, getCity, updateCity, deleteCity, saveCity };
