import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import UserRegister from '../pages/auth/UserRegister';
import ChooseRegister from '../pages/auth/ChooseRegister';
import UserLogin from '../pages/auth/UserLogin';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister';
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin';
import Home from '../pages/general/Home';
import Saved from '../pages/general/Saved';
import BottomNav from '../components/BottomNav';
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';
import Analytics from '../pages/food-partner/Analytics';

const AppRoutes = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public-only routes */}
                    <Route path="/register" element={<ProtectedRoute publicOnly><ChooseRegister /></ProtectedRoute>} />
                    <Route path="/user/register" element={<ProtectedRoute publicOnly><UserRegister /></ProtectedRoute>} />
                    <Route path="/user/login" element={<ProtectedRoute publicOnly><UserLogin /></ProtectedRoute>} />
                    <Route path="/food-partner/register" element={<ProtectedRoute publicOnly><FoodPartnerRegister /></ProtectedRoute>} />
                    <Route path="/food-partner/login" element={<ProtectedRoute publicOnly><FoodPartnerLogin /></ProtectedRoute>} />

                    {/* Protected routes for normal users */}
                    <Route path="/" element={<ProtectedRoute userOnly><Home /><BottomNav /></ProtectedRoute>} />
                    <Route path="/saved" element={<ProtectedRoute userOnly><Saved /><BottomNav /></ProtectedRoute>} />

                    {/* Protected routes for food partners */}
                    <Route path="/create-food" element={<ProtectedRoute partnerOnly><CreateFood /><BottomNav /></ProtectedRoute>} />
                    <Route path="/analytics" element={<ProtectedRoute partnerOnly><Analytics /><BottomNav /></ProtectedRoute>} />

                    {/* Profile route (accessible by authenticated users/partners) */}
                    <Route path="/food-partner/:id" element={<ProtectedRoute><Profile /><BottomNav /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default AppRoutes