import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Componends/Sidebar';
import AddEmployee from './pages/AddEmployee';
import Employees from './pages/Employees';
import Profile from './pages/Profile';
import FullProfile from './pages/FullProfile';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar /> {/* Sidebar remains fixed on the left */}
        <div className="main-content"> {/* Main content area for displaying routes */}
          <Routes>
            <Route path="api/addEmp" element={<AddEmployee />} />
            <Route path="/Employees" element={<Employees />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/viewProfile/:email" element={<FullProfile />} /> {/* Add the ViewProfile route */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
