"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      message: "Hello! I'm your DALScooter virtual assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const quickQuestions = [
    "How do I register?",
    "What vehicle types are available?",
    "How do I book a ride?",
    "What are the rental rates?",
    "How do I provide feedback?",
  ]

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      message: inputMessage,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        message: getBotResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputMessage("")
  }

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase()

    if (input.includes("register") || input.includes("sign up")) {
      return 'To register, click on the "Register" button on the login page. You\'ll need to provide your email, create a password, and answer a security question.'
    } else if (input.includes("book") || input.includes("reserve")) {
      return "To book a ride, go to the Booking page from your dashboard. Select your vehicle type, date, time, and pickup location. Daily bookings are available."
    } else if (input.includes("vehicle") || input.includes("bike") || input.includes("scooter")) {
      return "We offer three types of vehicles: eBikes ($12/hr), Gyroscooters ($15/hr), and Segways ($18/hr). All are eco-friendly and perfect for campus travel!"
    } else if (input.includes("rate") || input.includes("price") || input.includes("cost")) {
      return "Our rental rates are: eBike - $12/hr, Gyroscooter - $15/hr, Segway - $18/hr. Special discounts may apply!"
    } else if (input.includes("feedback") || input.includes("review")) {
      return "You can provide feedback through the Feedback page in your dashboard. Rate your experience and help us improve our service!"
    } else if (input.includes("access code") || input.includes("booking reference")) {
      return "Please provide your booking reference number, and I can help you find your vehicle access code and usage duration."
    } else {
      return "I'm here to help with DALScooter services! You can ask me about registration, booking, vehicle types, rates, or feedback. What would you like to know?"
    }
  }

  const handleQuickQuestion = (question) => {
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      message: question,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: "bot",
        message: getBotResponse(question),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-blue-400 text-white p-4 rounded-full shadow-2xl hover:from-indigo-600 hover:to-blue-500 transition-all duration-300 transform hover:scale-110 z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-96 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 flex flex-col z-40">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-400 text-white p-4 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <Bot className="h-6 w-6" />
              <div>
                <h3 className="font-semibold">DALScooter Assistant</h3>
                <p className="text-xs text-indigo-100">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start space-x-2 ${
                  msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div className={`p-2 rounded-full ${msg.type === "user" ? "bg-indigo-500" : "bg-slate-200"}`}>
                  {msg.type === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-slate-600" />
                  )}
                </div>
                <div
                  className={`max-w-xs p-3 rounded-2xl ${
                    msg.type === "user" ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-800"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Questions */}
          <div className="px-4 pb-2">
            <div className="flex flex-wrap gap-1">
              {quickQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-1 rounded-full transition-colors duration-200"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200/50">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-white/80 focus:border-indigo-500 focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors duration-200"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}