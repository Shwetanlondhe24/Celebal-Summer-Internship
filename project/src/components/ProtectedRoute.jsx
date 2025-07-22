import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    if (user.role !== requiredRole) {
      if (user.role === 'admin') {
        return <Navigate to="/admin" replace />;
      } else if (user.role === 'courier') {
        return <Navigate to="/courier" replace />;
      } else {
        return <Navigate to="/dashboard" replace />;
      }
    }
  } else {
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else if (user.role === 'courier') {
      return <Navigate to="/courier" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;