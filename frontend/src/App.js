import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Componends/Sidebar';
import AddEmployee from './pages/AddEmployee';
import Employees from './pages/Employees';
import Profile from './pages/Profile';
import FullProfile from './pages/FullProfile';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { Auth } from './context/authcontext';
import NavigationBar from './Componends/NavigationBar';



function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Auth>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route element={<Sidebar />}>
            <Route element = {<NavigationBar/>}/>
              <Route path="api/addEmp" element={<AddEmployee />} />
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
