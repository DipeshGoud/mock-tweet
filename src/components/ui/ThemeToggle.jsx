import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-full transition-all duration-300 ${
        isDark 
          ? 'bg-black hover:bg-black/80 text-white' 
          : 'bg-white hover:bg-white/80 text-black border border-black'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}

export default ThemeToggle