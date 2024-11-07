import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Componends/Sidebar';
import AddEmployee from './pages/AddEmployee';
import Employees from './pages/Employees';
import Profile from './pages/Profile';
import FullProfile from './pages/FullProfile';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import { Auth } from './context/authcontext';
import ProtectedRoutes from './pages/utils/ProtectedRoutes';



function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Auth>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/Login' element={<Login />} />

            <Route element={<ProtectedRoutes allowedRoutes = {['admin', 'user']} > <Sidebar /> </ProtectedRoutes>}>
              <Route path="api/addEmp" element={<ProtectedRoutes allowedRoutes = {['admin']}> <AddEmployee /> </ProtectedRoutes>} />
              <Route path="/Employees" element={<Employees />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/viewProfile/:email" element={<FullProfile />} /> {/* Add the ViewProfile route */}
              <Route path='/Dashboard' element={<Dashboard />} />
            </Route>
          </Routes>
        </Auth>
      </div>
    </BrowserRouter>
  );

}

export default App;
