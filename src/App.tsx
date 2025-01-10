import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navbar from './components/navbar/Navbar';
import LandingApp from './pages/landing/Landing';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import MainApp from './pages/main/app';
import './index.css';


const App = () => {
  return (

      <Router>
        <Navbar />
        <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingApp />} />

        {/* Auth Routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* Main App */}
        <Route path="/main" element={<MainApp />} />

        {/* Catch-all Route (Optional, for 404 handling) */}
        <Route path="*" element={<div>Page Not Found</div>} /><Route path="/main" element={<div>Main App</div>} />
        </Routes>
      </Router>

  )
}

export default App