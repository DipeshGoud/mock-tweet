import { createContext, useContext, useState, useEffect } from 'react'

// Theme Context
const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or default to dark
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      return saved ? saved === 'dark' : true
    }
    return true
  })
  
  // Apply theme to document and save to localStorage
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    if (isDark) {
      root.classList.add('dark')
      body.classList.add('dark')
      body.style.backgroundColor = '#0f172a'
      body.style.color = '#f8fafc'
    } else {
      root.classList.remove('dark')
      body.classList.remove('dark')
      body.style.backgroundColor = '#ffffff'
      body.style.color = '#1e293b'
    }
    
    // Save to localStorage
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])
  
  const toggleTheme = () => setIsDark(!isDark)
  
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}

export default ThemeContext