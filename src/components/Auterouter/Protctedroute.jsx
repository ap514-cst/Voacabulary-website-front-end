import React from 'react'
import { useAuth } from "../AuthContext/AuthContext"
import { Navigate, useLocation } from 'react-router-dom';

const ProtctedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location= useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    if (!user) {
        // User not logged in, redirect to login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;

}

export default ProtctedRoute ;
