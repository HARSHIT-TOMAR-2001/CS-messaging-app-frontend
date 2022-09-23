import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ActiveThreads from './pages/ActiveThreads';
import AgentDashboard from './pages/AgentDashboard';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/active-threads" element={<ActiveThreads />} />
        <Route path="/assigned-thread" element={<AgentDashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
