import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar'; // Make sure the path is correct
import AddEmployee from './pages/AddEmployee';
import Employees from './pages/Employees';
import Profile from './pages/Profile';
import FullProfile from './pages/FullProfile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false for testing

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {isLoggedIn ? (
          <>
            <Sidebar /> {/* Sidebar remains fixed on the left */}
            <div className="main-content"> {/* Main content area for displaying routes */}
              <Routes>
                <Route path="/api/addEmp" element={<AddEmployee />} />
                <Route path="/Employees" element={<Employees />} />
                <Route path="/Profile" element={<Profile />} />
                <Route path="/viewProfile/:email" element={<FullProfile />} /> {/* Add the ViewProfile route */}
                <Route path="/Dashboard" element={<Dashboard />} />
                {/* Add a default route or a catch-all route */}
              </Routes>
            </div>
          </>
        ) : (
          <Login onLogin={handleLogin} /> // Pass the login handler to the Login component
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
