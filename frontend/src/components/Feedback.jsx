"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Star, MessageSquare, Send } from "lucide-react"

export default function Feedback() {
  const [rating, setRating] = useState(0)
  const [vehicleType, setVehicleType] = useState("")
  const [bookingRef, setBookingRef] = useState("")
  const [feedback, setFeedback] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate feedback submission
    setMessage("Thank you for your feedback! Your review has been submitted successfully.")
    // Reset form
    setRating(0)
    setVehicleType("")
    setBookingRef("")
    setFeedback("")
  }

  const StarRating = ({ rating, setRating }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`p-1 transition-colors duration-200 ${
              star <= rating ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"
            }`}
          >
            <Star className="h-8 w-8 fill-current" />
          </button>
        ))}
      </div>
    )
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
              <MessageSquare className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-slate-800">Share Your Feedback</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Rate Your Experience</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Rating */}
            <div>
              <label className="block text-lg font-semibold text-slate-800 mb-4">Overall Rating</label>
              <div className="flex items-center space-x-4">
                <StarRating rating={rating} setRating={setRating} />
                <span className="text-lg text-slate-600">
                  {rating > 0 && (
                    <span className="font-semibold">
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"}
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent"}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-lg font-semibold text-slate-800 mb-3">Vehicle Type</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none"
                required
              >
                <option value="">Select vehicle type</option>
                <option value="gyroscooter">Gyroscooter</option>
                <option value="ebike">eBike</option>
                <option value="segway">Segway</option>
              </select>
            </div>

            {/* Booking Reference */}
            <div>
              <label className="block text-lg font-semibold text-slate-800 mb-3">Booking Reference (Optional)</label>
              <input
                type="text"
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
                placeholder="Enter your booking reference number"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none placeholder-slate-400"
              />
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block text-lg font-semibold text-slate-800 mb-3">Your Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={6}
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg bg-white/80 backdrop-blur-sm transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:outline-none placeholder-slate-400 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-400 text-white border-none rounded-lg py-4 px-6 text-xl font-bold cursor-pointer transition-all duration-200 hover:from-indigo-600 hover:to-blue-500 hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span>Submit Feedback</span>
            </button>
          </form>

          {message && (
            <div className="mt-6 p-4 bg-green-50/80 border border-green-200 rounded-lg">
              <p className="text-green-800 font-semibold">{message}</p>
            </div>
          )}
        </div>

        {/* Recent Feedback Display */}
        <div className="mt-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Recent Customer Reviews</h3>
          <div className="space-y-6">
            {[
              {
                name: "John D.",
                rating: 5,
                vehicle: "eBike",
                comment: "Excellent service! The bike was in perfect condition and the booking process was seamless.",
              },
              {
                name: "Sarah M.",
                rating: 4,
                vehicle: "Gyroscooter",
                comment:
                  "Great experience overall. The scooter was fun to ride and very convenient for getting around campus.",
              },
              {
                name: "Mike R.",
                rating: 5,
                vehicle: "Segway",
                comment: "Amazing! First time using a Segway and it was so easy. Highly recommend DALScooter!",
              },
            ].map((review, index) => (
              <div key={index} className="p-4 bg-slate-50/50 rounded-lg border border-slate-200/50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-slate-800">{review.name}</span>
                    <span className="text-sm text-slate-500">used {review.vehicle}</span>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-slate-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}