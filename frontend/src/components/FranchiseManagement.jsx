"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Plus, Edit, Trash2, Settings, DollarSign, Battery } from "lucide-react"

export default function FranchiseManagement() {
  const [activeTab, setActiveTab] = useState("vehicles")
  const [showAddForm, setShowAddForm] = useState(false)
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      type: "eBike",
      model: "Urban Cruiser",
      accessCode: "EB001",
      batteryLife: "85%",
      hourlyRate: 12,
      features: ["GPS", "LED Lights"],
      discount: "10%",
    },
    {
      id: 2,
      type: "Gyroscooter",
      model: "Balance Pro",
      accessCode: "GS002",
      batteryLife: "92%",
      hourlyRate: 15,
      features: ["Self-balancing", "Bluetooth"],
      discount: "5%",
    },
    {
      id: 3,
      type: "Segway",
      model: "City Glider",
      accessCode: "SW003",
      batteryLife: "78%",
      hourlyRate: 18,
      features: ["Remote Control", "Anti-theft"],
      discount: "15%",
    },
  ])

  const [newVehicle, setNewVehicle] = useState({
    type: "",
    model: "",
    accessCode: "",
    batteryLife: "",
    hourlyRate: "",
    features: [],
    discount: "",
  })

  const handleAddVehicle = (e) => {
    e.preventDefault()
    const vehicle = {
      ...newVehicle,
      id: vehicles.length + 1,
      hourlyRate: Number.parseFloat(newVehicle.hourlyRate),
    }
    setVehicles([...vehicles, vehicle])
    setNewVehicle({ type: "", model: "", accessCode: "", batteryLife: "", hourlyRate: "", features: [], discount: "" })
    setShowAddForm(false)
  }

  const handleDeleteVehicle = (id) => {
    setVehicles(vehicles.filter((v) => v.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200">
              <ArrowLeft className="h-6 w-6 text-slate-600" />
            </Link>
            <div className="flex items-center space-x-3">
              <Settings className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-slate-800">Franchise Management</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 mb-8">
          <div className="flex border-b border-slate-200/50">
            <button
              onClick={() => setActiveTab("vehicles")}
              className={`px-6 py-4 font-semibold transition-colors duration-200 ${
                activeTab === "vehicles"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Vehicle Management
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-6 py-4 font-semibold transition-colors duration-200 ${
                activeTab === "analytics"
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-slate-600 hover:text-slate-800"
              }`}
            >
              Analytics
            </button>
          </div>

          {/* Vehicle Management Tab */}
          {activeTab === "vehicles" && (
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Vehicle Fleet</h2>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-indigo-500 to-blue-400 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-blue-500 transition-all duration-200"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add Vehicle</span>
                </button>
              </div>

              {/* Add Vehicle Form */}
              {showAddForm && (
                <div className="bg-slate-50/50 rounded-xl p-6 mb-6 border border-slate-200/50">
                  <h3 className="text-lg font-semibold text-slate-800 mb-4">Add New Vehicle</h3>
                  <form onSubmit={handleAddVehicle} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={newVehicle.type}
                      onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                      className="px-4 py-2 border border-slate-300 rounded-lg bg-white/80 focus:border-indigo-500 focus:outline-none"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="eBike">eBike</option>
                      <option value="Gyroscooter">Gyroscooter</option>
                      <option value="Segway">Segway</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Model Name"
                      value={newVehicle.model}
                      onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                      className="px-4 py-2 border border-slate-300 rounded-lg bg-white/80 focus:border-indigo-500 focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Access Code"
                      value={newVehicle.accessCode}
                      onChange={(e) => setNewVehicle({ ...newVehicle, accessCode: e.target.value })}
                      className="px-4 py-2 border border-slate-300 rounded-lg bg-white/80 focus:border-indigo-500 focus:outline-none"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Hourly Rate ($)"
                      value={newVehicle.hourlyRate}
                      onChange={(e) => setNewVehicle({ ...newVehicle, hourlyRate: e.target.value })}
                      className="px-4 py-2 border border-slate-300 rounded-lg bg-white/80 focus:border-indigo-500 focus:outline-none"
                      required
                    />
                    <div className="md:col-span-2 flex space-x-4">
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
                      >
                        Add Vehicle
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Vehicle List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="bg-white/80 rounded-xl p-6 shadow-lg border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-800">{vehicle.type}</h3>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Model:</span>
                        <span className="font-semibold">{vehicle.model}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Access Code:</span>
                        <span className="font-mono bg-slate-100 px-2 py-1 rounded">{vehicle.accessCode}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 flex items-center">
                          <Battery className="h-4 w-4 mr-1" />
                          Battery:
                        </span>
                        <span className="font-semibold text-green-600">{vehicle.batteryLife}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          Rate:
                        </span>
                        <span className="font-semibold">${vehicle.hourlyRate}/hr</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Discount:</span>
                        <span className="font-semibold text-orange-600">{vehicle.discount}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 block mb-2">Features:</span>
                        <div className="flex flex-wrap gap-1">
                          {vehicle.features.map((feature, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Fleet Analytics</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Total Vehicles</h3>
                  <p className="text-3xl font-bold">{vehicles.length}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Active Bookings</h3>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Revenue Today</h3>
                  <p className="text-3xl font-bold">$1,248</p>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-2">Avg Rating</h3>
                  <p className="text-3xl font-bold">4.8</p>
                </div>
              </div>

              <div className="bg-white/80 rounded-xl p-6 shadow-lg border border-white/20">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Vehicle Utilization</h3>
                <div className="space-y-4">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg">
                      <div>
                        <span className="font-semibold">
                          {vehicle.type} - {vehicle.model}
                        </span>
                        <span className="text-slate-600 ml-2">({vehicle.accessCode})</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold">{Math.floor(Math.random() * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}