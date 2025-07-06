"use client"
import { Link, useNavigate } from "react-router-dom"
import { Calendar, Star, Settings, LogOut, Bike, BarChart3 } from "lucide-react"

export default function Dashboard() {
  const email = localStorage.getItem("userEmail")
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userGroup")
    navigate("/login")
  }

  const quickActions = [
    { title: "Book a Ride", icon: Calendar, link: "/booking", color: "from-blue-500 to-cyan-400" },
    { title: "Give Feedback", icon: Star, link: "/feedback", color: "from-purple-500 to-pink-400" },
    // { title: "Franchise Panel", icon: Settings, link: "/franchise", color: "from-green-500 to-emerald-400" },
    // { title: "Admin Analytics", icon: BarChart3, link: "/admin", color: "from-orange-500 to-red-400" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bike className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-slate-800">DALScooter</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notification Banner */}
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
        <p className="font-bold">Welcome!</p>
        <p>You have successfully signed in as a Registered User.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome to DALScooter</h2>
          <p className="text-lg text-slate-600 mb-2">
            You are logged in as: <span className="font-semibold text-indigo-600">{email}</span>
            <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
              Registered User
            </span>
          </p>
          <p className="text-slate-600">
            Your eco-friendly transportation solution is ready. Choose from our available services below.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>
              <div className="p-6">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} text-white mb-4`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-200">
                  {action.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Available Features</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">Real-time bike availability</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">Secure booking system</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">Feedback and rating system</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">24/7 virtual assistant support</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">Multi-factor authentication enabled</span>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Vehicle Types</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-800">Gyroscooter</h4>
                  <p className="text-sm text-slate-600">Self-balancing electric scooter</p>
                </div>
                <span className="text-blue-600 font-bold">$15/hr</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-800">eBike</h4>
                  <p className="text-sm text-slate-600">Electric bicycle with pedal assist</p>
                </div>
                <span className="text-green-600 font-bold">$12/hr</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-slate-800">Segway</h4>
                  <p className="text-sm text-slate-600">Two-wheeled personal transporter</p>
                </div>
                <span className="text-purple-600 font-bold">$18/hr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
