import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fabric } from 'fabric'
import { 
  X, 
  Square, 
  Circle, 
  Type, 
  Image as ImageIcon,
  Palette,
  Download,
  Undo,
  Redo,
  Trash2
} from 'lucide-react'

const DesignCanvas = ({ onClose }) => {
  const canvasRef = useRef(null)
  const [canvas, setCanvas] = useState(null)
  const [selectedTool, setSelectedTool] = useState('select')
  const [selectedColor, setSelectedColor] = useState('#3B82F6')

  const tools = [
    { id: 'select', name: 'Select', icon: '👆' },
    { id: 'rectangle', name: 'Rectangle', icon: Square },
    { id: 'circle', name: 'Circle', icon: Circle },
    { id: 'text', name: 'Text', icon: Type },
    { id: 'image', name: 'Image', icon: ImageIcon },
  ]

  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ]

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff'
    })

    setCanvas(fabricCanvas)

    return () => {
      fabricCanvas.dispose()
    }
  }, [])

  const addRectangle = () => {
    if (!canvas) return
    
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: selectedColor,
      stroke: '#000000',
      strokeWidth: 2
    })
    
    canvas.add(rect)
    canvas.setActiveObject(rect)
  }

  const addCircle = () => {
    if (!canvas) return
    
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: selectedColor,
      stroke: '#000000',
      strokeWidth: 2
    })
    
    canvas.add(circle)
    canvas.setActiveObject(circle)
  }

  const addText = () => {
    if (!canvas) return
    
    const text = new fabric.IText('Click to edit', {
      left: 100,
      top: 100,
      fontFamily: 'Inter',
      fontSize: 24,
      fill: selectedColor
    })
    
    canvas.add(text)
    canvas.setActiveObject(text)
  }

  const deleteSelected = () => {
    if (!canvas) return
    
    const activeObjects = canvas.getActiveObjects()
    if (activeObjects.length) {
      canvas.remove(...activeObjects)
      canvas.discardActiveObject()
    }
  }

  const downloadCanvas = () => {
    if (!canvas) return
    
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1
    })
    
    const link = document.createElement('a')
    link.download = 'oro-design.png'
    link.href = dataURL
    link.click()
  }

  const handleToolClick = (toolId) => {
    setSelectedTool(toolId)
    
    switch (toolId) {
      case 'rectangle':
        addRectangle()
        break
      case 'circle':
        addCircle()
        break
      case 'text':
        addText()
        break
      default:
        break
    }
  }

  return (
    <motion.div
      className="fixed inset-4 glass-panel rounded-2xl flex flex-col"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/20">
        <h2 className="text-2xl font-bold text-white">Design Studio</h2>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors p-2"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Toolbar */}
        <div className="w-20 bg-white/5 border-r border-white/20 p-4 space-y-4">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                selectedTool === tool.id
                  ? 'bg-oro-500 text-white shadow-lg'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
              title={tool.name}
            >
              {typeof tool.icon === 'string' ? (
                <span className="text-xl">{tool.icon}</span>
              ) : (
                <tool.icon className="w-5 h-5" />
              )}
            </button>
          ))}
          
          <div className="border-t border-white/20 pt-4 space-y-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-lg border-2 transition-all ${
                  selectedColor === color
                    ? 'border-white scale-110'
                    : 'border-white/30 hover:border-white/60'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col">
          {/* Canvas Toolbar */}
          <div className="flex items-center justify-between p-4 bg-white/5 border-b border-white/20">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => canvas?.undo?.()}
                className="metro-button text-gray-700"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                onClick={() => canvas?.redo?.()}
                className="metro-button text-gray-700"
              >
                <Redo className="w-4 h-4" />
              </button>
              <button
                onClick={deleteSelected}
                className="metro-button text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={downloadCanvas}
              className="metro-button text-oro-600 font-semibold"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>

          {/* Canvas */}
          <div className="flex-1 flex items-center justify-center p-8 bg-gray-100/10">
            <div className="bg-white rounded-lg shadow-2xl">
              <canvas ref={canvasRef} />
            </div>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-80 bg-white/5 border-l border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Properties</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Fill Color
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-12 h-8 rounded border border-white/30"
                />
                <span className="text-white/70 text-sm">{selectedColor}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                AI Suggestions
              </label>
              <div className="space-y-2">
                <button className="w-full metro-button text-left text-sm">
                  🎨 Auto-arrange elements
                </button>
                <button className="w-full metro-button text-left text-sm">
                  🌈 Suggest color palette
                </button>
                <button className="w-full metro-button text-left text-sm">
                  ✨ Enhance composition
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DesignCanvas