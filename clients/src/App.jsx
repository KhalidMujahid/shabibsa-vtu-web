import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyData from "./pages/BuyData";
import BuyAirtime from "./pages/BuyAirtime";
import FundWallet from "./pages/FundWallet";
import Support from "./pages/Support";
import Transaction from "./pages/Transaction";
import Bills from "./pages/Bills";
import BulkSms from "./pages/BulkSms";
import Transfer from "./pages/Transfer";
import Home from "./pages/Home";
import More from "./pages/More";
import Settings from "./pages/Settings";
import Airtime2cash from "./pages/Airtime2cash";
import Exams from "./pages/Exams";
import { useSelector } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useSelector((state) => state.user);

  return (
    <Router>
      <div>
        <Routes>
          <Route index element={user ? <Navigate to="/dashboard" replace /> : <Home />} />
          
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/menu" 
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/buydata" 
            element={
              <ProtectedRoute>
                <BuyData />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/buyairtime" 
            element={
              <ProtectedRoute>
                <BuyAirtime />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/fundwallet" 
            element={
              <ProtectedRoute>
                <FundWallet />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bluksms" 
            element={
              <ProtectedRoute>
                <BulkSms />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transfer" 
            element={
              <ProtectedRoute>
                <Transfer />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bills" 
            element={
              <ProtectedRoute>
                <Bills />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transactions" 
            element={
              <ProtectedRoute>
                <Transaction />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/more" 
            element={
              <ProtectedRoute>
                <More />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/support" 
            element={
              <ProtectedRoute>
                <Support />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/airtime2cash" 
            element={
              <ProtectedRoute>
                <Airtime2cash />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/exams" 
            element={
              <ProtectedRoute>
                <Exams />
              </ProtectedRoute>
            } 
          />
         
          <Route path="*" element={user ? <Navigate to="/dashboard" replace/> : <Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

