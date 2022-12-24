import React from 'react';
import './App.css';
import SignupPage from './authentication/SignupPage';
import LoginPage from './authentication/LoginPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from './common/components/NavBar';
import { MantineProvider } from '@mantine/core';
import { Route, Routes, useLocation } from 'react-router-dom';
import CityList from './cities/components/CityList';
import CityEdit from './cities/components/CityEdit';
import AuthProvider from './authentication/context/AuthContext';
import LandingPage from './landingPage/LandingPage';

const queryClient = new QueryClient();

function App() {
  const { pathname } = useLocation();
  return (
    <MantineProvider theme={{ colorScheme: 'light' }}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
		{pathname !== '/' && <NavBar/>}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<SignupPage />} />

              <Route path="/cities">
                <Route path="add" element={<CityEdit />} />
                <Route path=":id" element={<CityEdit />} />
                <Route index element={<CityList />} />
              </Route>
            </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
