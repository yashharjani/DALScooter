"use client"
import { Link, useNavigate } from "react-router-dom"
import { Calendar, Star, LogOut, Bike, MessageCircle, User } from "lucide-react"

export default function Dashboard() {
  const email = localStorage.getItem("userEmail")
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userGroup")
    navigate("/login")
  }

  // Only user-accessible actions - NO admin routes
  const userActions = [
    {
      title: "Book a Ride",
      description: "Reserve an eBike, Gyroscooter, or Segway",
      icon: Calendar,
      link: "/booking",
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Give Feedback",
      description: "Rate your experience and provide feedback",
      icon: Star,
      link: "/feedback",
      color: "from-purple-500 to-pink-400",
    },
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
        <p>
          You have successfully signed in as a Registered User. You will receive notifications for important updates.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Welcome to DALScooter</h2>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-lg text-slate-600">
                Logged in as: <span className="font-semibold text-indigo-600">{email}</span>
              </p>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Registered User
              </span>
            </div>
          </div>
          <p className="text-slate-600">
            Your eco-friendly transportation solution is ready. Book rides and share your experience with us!
          </p>
        </div>

        {/* User Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {userActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>
              <div className="relative p-8">
                <div className="flex items-start space-x-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg`}>
                    <action.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors duration-200">
                      {action.title}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed group-hover:text-slate-700 transition-colors duration-200">
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Your Features</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">Daily booking system for all vehicles</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">Real-time vehicle availability</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-slate-700">Secure access codes for your bookings</span>
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
                <span className="text-slate-700">Multi-factor authentication security</span>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Available Vehicles</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-lg border border-blue-200/30">
                <div>
                  <h4 className="font-semibold text-slate-800">eBike</h4>
                  <p className="text-sm text-slate-600">Electric bicycle with pedal assist</p>
                  <p className="text-xs text-slate-500 mt-1">Perfect for campus and city rides</p>
                </div>
                <span className="text-blue-600 font-bold text-xl">$12/hr</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-lg border border-green-200/30">
                <div>
                  <h4 className="font-semibold text-slate-800">Gyroscooter</h4>
                  <p className="text-sm text-slate-600">Self-balancing electric scooter</p>
                  <p className="text-xs text-slate-500 mt-1">Easy to learn, fun to ride</p>
                </div>
                <span className="text-green-600 font-bold text-xl">$15/hr</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-lg border border-purple-200/30">
                <div>
                  <h4 className="font-semibold text-slate-800">Segway</h4>
                  <p className="text-sm text-slate-600">Two-wheeled personal transporter</p>
                  <p className="text-xs text-slate-500 mt-1">Premium experience with advanced features</p>
                </div>
                <span className="text-purple-600 font-bold text-xl">$18/hr</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">1. Book Your Ride</h4>
              <p className="text-slate-600">Choose your vehicle, select date/time, and pick your location</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">2. Get Access Code</h4>
              <p className="text-slate-600">Receive your unique access code and vehicle location details</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-bold text-slate-800 mb-2">3. Ride & Review</h4>
              <p className="text-slate-600">Enjoy your eco-friendly ride and share your experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}