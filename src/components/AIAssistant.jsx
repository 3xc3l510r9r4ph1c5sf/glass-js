import React, { useEffect } from 'react'
import { useAI } from '../contexts/AIContext'

const AIAssistant = () => {
  const { initializeAI, isLoading } = useAI()

  useEffect(() => {
    initializeAI()
  }, [initializeAI])

  if (isLoading) {
    return (
      <div className="fixed top-4 left-4 glass-panel rounded-lg p-3 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-oro-400 rounded-full animate-pulse" />
          <span className="text-white text-sm">Loading AI...</span>
        </div>
      </div>
    )
  }

  return null
}

export default AIAssistant