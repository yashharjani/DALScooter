import { Routes, Route, useLocation } from "react-router-dom"
import Register from "./components/Register"
import Login from "./components/Login"
import ConfirmAccount from "./components/ConfirmAccount"
import Dashboard from "./components/Dashboard"
import Booking from "./components/Booking"
import Feedback from "./components/Feedback"
import FranchiseManagement from "./components/FranchiseManagement"
import AdminAnalytics from "./components/AdminAnalytics"
import VirtualAssistant from "./components/VirtualAssistant"

export default function App() {
  const location = useLocation()
  const hideNav =
    location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/confirm"
  const hideHeading =
    location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/confirm"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="p-8">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm" element={<ConfirmAccount />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/franchise" element={<FranchiseManagement />} />
          <Route path="/admin" element={<AdminAnalytics />} />
        </Routes>
      </div>
      <VirtualAssistant />
    </div>
  )
}