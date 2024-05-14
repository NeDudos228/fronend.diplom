import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import TempPage from './pages/TempPage/Index';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Footer from './pages/Footer';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<TempPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer></Footer>
    </div>

  );
}

export default App;
