import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())

// Store active users and chat history
const activeUsers = new Map()
const chatHistory = []

io.on('connection', (socket) => {
  console.log('User connected:', socket.id)
  
  // Add user to active users
  activeUsers.set(socket.id, {
    id: socket.id,
    joinedAt: new Date()
  })

  // Send chat history to new user
  socket.emit('chat_history', chatHistory)

  // Handle chat messages
  socket.on('chat_message', (message) => {
    console.log('Received message:', message)
    
    // Store message in history
    chatHistory.push({
      ...message,
      socketId: socket.id,
      timestamp: new Date()
    })

    // Broadcast to all connected clients
    socket.broadcast.emit('chat_message', message)
  })

  // Handle design collaboration events
  socket.on('design_update', (data) => {
    console.log('Design update:', data)
    socket.broadcast.emit('design_update', data)
  })

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
    activeUsers.delete(socket.id)
  })
})

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', activeUsers: activeUsers.size })
})

app.get('/api/users', (req, res) => {
  res.json({ 
    count: activeUsers.size,
    users: Array.from(activeUsers.values())
  })
})

const PORT = process.env.PORT || 3001

server.listen(PORT, () => {
  console.log(`🚀 Oro-OS Server running on port ${PORT}`)
  console.log(`📡 Socket.IO server ready for connections`)
})