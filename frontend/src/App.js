import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './Componends/Sidebar';
import AddEmployee from './pages/AddEmployee';
import Employees from './pages/Employees';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar /> {/* Sidebar remains fixed on the left */}
        <div className="main-content"> {/* Main content area for displaying routes */}
          <Routes>
            <Route path="/Add" element={<AddEmployee />} />
            <Route path="/Employees" element={<Employees />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
