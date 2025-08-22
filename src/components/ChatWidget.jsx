import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Draggable from 'react-draggable'
import { 
  MessageCircle, 
  X, 
  Minus, 
  Send, 
  Bot, 
  User,
  Maximize2,
  Minimize2
} from 'lucide-react'
import { useSocket } from '../contexts/SocketContext'
import { useAI } from '../contexts/AIContext'

const ChatWidget = ({ onClose, onMinimize }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: 'Hello! I\'m your AI design assistant. How can I help you create something amazing today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isExpanded, setIsExpanded] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  
  const { socket } = useSocket()
  const { generateResponse } = useAI()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Emit to socket for real-time collaboration
    if (socket) {
      socket.emit('chat_message', userMessage)
    }

    try {
      // Generate AI response
      const aiResponse = await generateResponse(inputValue)
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      
      if (socket) {
        socket.emit('chat_message', aiMessage)
      }
    } catch (error) {
      console.error('Error generating AI response:', error)
      const errorMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: 'I apologize, but I\'m having trouble processing your request right now. Please try again.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Draggable handle=".chat-handle" bounds="parent">
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className={`glass-panel rounded-2xl shadow-2xl ${
          isExpanded ? 'w-96 h-[500px]' : 'w-80 h-16'
        } transition-all duration-300 ease-in-out`}>
          
          {/* Header */}
          <div className="chat-handle flex items-center justify-between p-4 border-b border-white/20 cursor-move">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-oro-400 to-oro-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                <p className="text-white/70 text-xs">Always here to help</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onMinimize}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <Minus className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                className="flex flex-col h-[436px]"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 436 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${
                        message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.type === 'user' 
                            ? 'bg-blue-500' 
                            : 'bg-gradient-to-br from-oro-400 to-oro-600'
                        }`}>
                          {message.type === 'user' ? 
                            <User className="w-3 h-3 text-white" /> : 
                            <Bot className="w-3 h-3 text-white" />
                          }
                        </div>
                        <div className={`chat-bubble ${
                          message.type === 'user' 
                            ? 'bg-blue-500/90 text-white' 
                            : 'bg-white/95 text-gray-800'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className={`text-xs mt-1 ${
                            message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* Typing indicator */}
                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-oro-400 to-oro-600 rounded-full flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="chat-bubble bg-white/95">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/20">
                  <div className="flex items-center space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about design..."
                      className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-2 
                        text-white placeholder-white/70 focus:outline-none focus:ring-2 
                        focus:ring-oro-400 focus:border-transparent"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="bg-oro-500 hover:bg-oro-600 disabled:bg-gray-500 
                        disabled:cursor-not-allowed rounded-xl p-2 transition-colors"
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Draggable>
  )
}

export default ChatWidget