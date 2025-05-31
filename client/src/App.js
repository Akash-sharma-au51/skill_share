import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AppNavbar from './component/Navbar';

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <AppNavbar />
      </div>
      <div className="container">
        <Routes>
          <Route path="/" element={
            <>
              <h1 className="text-center">Login Page</h1>
              <hr />
              <Login />
            </>
          } />
          <Route path="/register" element={
            <>
              <h1 className="text-center">Register Page</h1>
              <hr />
              <Register />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
