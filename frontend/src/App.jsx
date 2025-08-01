import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateCV from './pages/CreateCV';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import EditCVPages from './pages/EditCVPages';
import VistaPreviaCV from './pages/VistaPreviaCV';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear-cv" element={<CreateCV />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/editar-cv/:id" element={<EditCVPages />} />
        <Route path="/vista-previa/:id" element={<VistaPreviaCV />} />
      </Routes>
    </Router>
  );
}

export default App;