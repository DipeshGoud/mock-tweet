import { ExternalLink, Heart } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

function Footer() {
  const { isDark } = useTheme()

  return (
    <div className={`w-full ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-sm border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg mt-8`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-center">
          {/* Welcome Message and Creator Info */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <div className="flex items-center gap-2">
              <Heart className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-500'} fill-current`} />
              <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Welcome to Mock Tweet Generator!
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Created by
              </span>
              <a 
                href="https://www.linkedin.com/in/dipesh-gaud/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 text-sm font-medium ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors duration-200 hover:underline`}
              >
                Dipesh Gaud
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info - Only on larger screens */}
        <div className="hidden md:block mt-2 pt-2 border-t border-opacity-20 border-gray-400">
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center`}>
            Generate beautiful mock tweets for your presentations, mockups, and creative projects. 
            <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} font-medium`}>
              Free to use • No watermarks • High quality downloads
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer