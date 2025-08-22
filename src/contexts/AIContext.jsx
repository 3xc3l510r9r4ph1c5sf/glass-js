import React, { createContext, useContext, useState, useCallback } from 'react'

const AIContext = createContext()

export const useAI = () => {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within an AIProvider')
  }
  return context
}

export const AIProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [model, setModel] = useState(null)

  const initializeAI = useCallback(async () => {
    setIsLoading(true)
    try {
      // Initialize Transformers.js model
      const { pipeline } = await import('@xenova/transformers')
      const generator = await pipeline('text-generation', 'Xenova/gpt2')
      setModel(generator)
      console.log('AI model loaded successfully')
    } catch (error) {
      console.error('Failed to load AI model:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const generateResponse = useCallback(async (prompt) => {
    if (!model) {
      return "I'm still loading my AI capabilities. Please try again in a moment."
    }

    try {
      // Enhanced prompt for design-focused responses
      const designPrompt = `As an AI design assistant, help with: ${prompt}\n\nResponse:`
      
      const output = await model(designPrompt, {
        max_length: 100,
        num_return_sequences: 1,
        temperature: 0.7,
        do_sample: true,
        pad_token_id: 50256
      })

      let response = output[0].generated_text.replace(designPrompt, '').trim()
      
      // Clean up the response
      response = response.split('\n')[0] // Take first line
      
      // If response is too short or doesn't make sense, provide a fallback
      if (response.length < 10) {
        response = generateFallbackResponse(prompt)
      }

      return response
    } catch (error) {
      console.error('Error generating AI response:', error)
      return generateFallbackResponse(prompt)
    }
  }, [model])

  const generateFallbackResponse = (prompt) => {
    const designResponses = [
      "That's a great design question! Consider using complementary colors and balanced composition.",
      "For better visual hierarchy, try varying font sizes and using whitespace effectively.",
      "I'd suggest exploring different layout options and testing with your target audience.",
      "Color psychology can really enhance your design - what mood are you trying to convey?",
      "Have you considered the golden ratio for proportions? It often creates pleasing layouts.",
      "Typography is crucial - make sure your font choices align with your brand personality."
    ]
    
    return designResponses[Math.floor(Math.random() * designResponses.length)]
  }

  const value = {
    isLoading,
    model,
    initializeAI,
    generateResponse
  }

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  )
}