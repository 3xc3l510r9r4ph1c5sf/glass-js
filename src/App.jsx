import React, { useState, useEffect } from 'react'
import Desktop from './components/Desktop'
import Dock from './components/Dock'
import ChatWidget from './components/ChatWidget'
import DesignCanvas from './components/DesignCanvas'
import AIAssistant from './components/AIAssistant'
import { SocketProvider } from './contexts/SocketContext'
import { AIProvider } from './contexts/AIContext'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [activeApp, setActiveApp] = useState(null)
  const [isDesignCanvasOpen, setIsDesignCanvasOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(true)

  const apps = [
    {
      id: 'design',
      name: 'Design Studio',
      icon: '🎨',
      color: 'from-purple-500 to-pink-500',
      action: () => setIsDesignCanvasOpen(true)
    },
    {
      id: 'ai-assistant',
      name: 'AI Assistant',
      icon: '🤖',
      color: 'from-blue-500 to-cyan-500',
      action: () => setIsChatOpen(true)
    },
    {
      id: 'gallery',
      name: 'Gallery',
      icon: '🖼️',
      color: 'from-green-500 to-emerald-500',
      action: () => setActiveApp('gallery')
    },
    {
      id: 'collaboration',
      name: 'Collaborate',
      icon: '👥',
      color: 'from-orange-500 to-red-500',
      action: () => setActiveApp('collaboration')
    }
  ]

  return (
    <SocketProvider>
      <AIProvider>
        <div className="h-screen w-screen overflow-hidden relative">
          {/* Background with animated gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-gradient-x" />
          
          {/* Floating orbs for ambiance */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ top: '10%', left: '10%' }}
            />
            <motion.div
              className="absolute w-96 h-96 bg-oro-400/20 rounded-full blur-3xl"
              animate={{
                x: [0, -80, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ top: '60%', right: '10%' }}
            />
          </div>

          {/* Desktop Environment */}
          <Desktop />

          {/* Design Canvas Modal */}
          <AnimatePresence>
            {isDesignCanvasOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              >
                <DesignCanvas onClose={() => setIsDesignCanvasOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Widget */}
          <AnimatePresence>
            {isChatOpen && (
              <ChatWidget 
                onClose={() => setIsChatOpen(false)}
                onMinimize={() => setIsChatOpen(false)}
              />
            )}
          </AnimatePresence>

          {/* Dock */}
          <Dock 
            apps={apps} 
            onAppClick={(app) => app.action()}
          />

          {/* AI Assistant Integration */}
          <AIAssistant />
        </div>
      </AIProvider>
    </SocketProvider>
  )
}

export default App