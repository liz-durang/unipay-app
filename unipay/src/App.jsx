import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Landing from './pages/Landing';
import LoanCalculator from './pages/LoanCalculator';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import './css/App.css';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return <LoadingScreen />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        {children}
      </div>
    </div>
  );
};

function App() {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-container">
      <Routes>
        {/* Ruta pública - Landing */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <div className="public-layout">
                <Landing />
                <Footer />
              </div>
            )
          } 
        />

        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        <Route
          path="/loan-calculator"
          element={
            <PrivateRoute>
              <LoanCalculator />
            </PrivateRoute>
          }
        />

        {/* Ruta para páginas no encontradas */}
        <Route 
          path="*" 
          element={
            <Navigate to="/" replace />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;