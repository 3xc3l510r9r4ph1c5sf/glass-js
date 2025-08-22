import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Dock = ({ apps, onAppClick }) => {
  const [hoveredApp, setHoveredApp] = useState(null)

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
    >
      <div className="glass-panel rounded-2xl px-4 py-3">
        <div className="flex items-center space-x-3">
          {apps.map((app, index) => (
            <motion.div
              key={app.id}
              className="relative"
              onMouseEnter={() => setHoveredApp(app.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              <motion.button
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${app.color} 
                  flex items-center justify-center text-2xl shadow-lg
                  hover:shadow-xl transition-all duration-200`}
                whileHover={{ 
                  scale: 1.2, 
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onAppClick(app)}
              >
                {app.icon}
              </motion.button>

              {/* App name tooltip */}
              <motion.div
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                  bg-black/80 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredApp === app.id ? 1 : 0,
                  y: hoveredApp === app.id ? 0 : 10
                }}
                transition={{ duration: 0.2 }}
              >
                {app.name}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Dock