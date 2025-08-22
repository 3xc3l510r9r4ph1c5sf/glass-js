import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Folder, FileText, Image, Settings } from 'lucide-react'

const Desktop = () => {
  const [selectedItem, setSelectedItem] = useState(null)

  const desktopItems = [
    { id: 1, name: 'Projects', icon: Folder, type: 'folder', x: 50, y: 50 },
    { id: 2, name: 'Templates', icon: Folder, type: 'folder', x: 50, y: 150 },
    { id: 3, name: 'Assets', icon: Image, type: 'folder', x: 50, y: 250 },
    { id: 4, name: 'Settings', icon: Settings, type: 'app', x: 50, y: 350 },
  ]

  return (
    <div className="absolute inset-0 p-4">
      {desktopItems.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute cursor-pointer select-none ${
            selectedItem === item.id ? 'bg-white/20' : 'hover:bg-white/10'
          } rounded-lg p-3 transition-all duration-200`}
          style={{ left: item.x, top: item.y }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSelectedItem(item.id)}
          onDoubleClick={() => {
            // Handle double-click to open
            console.log(`Opening ${item.name}`)
          }}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="glass-panel rounded-xl p-4">
              <item.icon className="w-8 h-8 text-white" />
            </div>
            <span className="text-white text-sm font-medium text-center max-w-20 truncate">
              {item.name}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Desktop