import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Login from '../Login';
import Register from '../Register';
import App from '../App';

export default function AppRouter() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate replace to="/todos" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/todos" element={isAuthenticated ? <App /> : <Navigate replace to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}
