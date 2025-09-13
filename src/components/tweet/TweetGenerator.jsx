import { useRef, useState } from 'react'
import { Download } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { useTweetData, useTweetInteractions } from '../../hooks/useTweetData'
import { downloadTweetImage } from '../../utils/imageUtils'
import TweetCard from './TweetCard'
import TweetEditor from './TweetEditor'
import ThemeToggle from '../ui/ThemeToggle'
import logoPng from '../../assets/logo.png'

function TweetGenerator() {
  const { isDark } = useTheme()
  const { tweetData, setTweetData } = useTweetData()
  const { liked, retweeted, handleLike, handleRetweet } = useTweetInteractions(tweetData, setTweetData)
  const mobileTweetRef = useRef(null)
  const desktopTweetRef = useRef(null)
  const [previewTheme, setPreviewTheme] = useState('system') // 'system', 'light', or 'dark'

  const handleDownload = async (theme = 'system') => {
    // Update preview theme before capturing
    setPreviewTheme(theme);
    
    // Small delay to ensure the theme change is applied
    setTimeout(async () => {
      const elementToCapture = (desktopTweetRef.current && desktopTweetRef.current.offsetParent !== null)
        ? desktopTweetRef.current
        : mobileTweetRef.current;

      if (elementToCapture) {
        await downloadTweetImage(elementToCapture, tweetData.handle);
      } else {
        console.error("No tweet card element found to capture.");
      }
    }, 100);
  }

  return (
    <div className={`min-h-screen w-full ${isDark ? 'bg-gray-900' : 'bg-gray-50'} transition-all duration-500`}>
      {/* Grid Background Pattern */}
      <div className={`fixed inset-0 w-full h-full ${isDark ? 'opacity-10' : 'opacity-5'}`} style={{
        backgroundImage: `
          linear-gradient(${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px),
        linear-gradient(90deg, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundAttachment: 'fixed'
      }}></div>
      
      {/* Header */}
      <div className="relative z-10 px-4 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl`}>
                <img src={logoPng} alt="TweetGen Logo" className="w-12 h-12" />
              </div>
              <div>
                <h1 className={`${isDark ? 'text-white' : 'text-black'} text-2xl lg:text-4xl font-bold bg-gradient-to-r ${isDark ? 'from-blue-300 to-white' : 'from-blue-600 to-blue-800'} bg-clip-text text-transparent`}>
                  Mock Tweet Generator
                </h1>
                <p className={`${isDark ? 'text-white/80' : 'text-black/80'} text-sm lg:text-base mt-2`}>
                  Create stunning fake tweets in seconds ✨
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownload}
                className={`group flex items-center gap-2 px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl transition-all duration-300 text-sm lg:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                  isDark 
                    ? 'bg-gradient-to-r from-gray-700 to-black hover:from-gray-600 hover:to-gray-900 text-white'
          : 'bg-gradient-to-r from-gray-400 to-gray-700 hover:from-gray-300 hover:to-gray-600 text-white'
                }`}
              >
                <Download className="w-4 h-4 lg:w-5 lg:h-5 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">Download Tweet</span>
                <span className="sm:hidden">Download</span>
              </button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 pb-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            <div className="relative">
              {/* Grid Background for Tweet Preview */}
              <div className={`absolute inset-0 rounded-2xl ${isDark ? 'bg-black/20' : 'bg-white/60'} backdrop-blur-sm`}></div>
              <div className="relative p-0 md:p-1 lg:p-8 xl:p-12">
                <TweetCard 
                  ref={mobileTweetRef}
                  tweetData={tweetData}
                  liked={liked}
                  retweeted={retweeted}
                  onLike={handleLike}
                  onRetweet={handleRetweet}
                  forcedTheme={previewTheme}
                />
              </div>
            </div>
            <div className={`${isDark ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm rounded-2xl border ${isDark ? 'border-gray-500/30' : 'border-gray-400/30'} shadow-xl`}>
              <TweetEditor 
                tweetData={tweetData}
                setTweetData={setTweetData}
                onDownload={handleDownload}
                onThemeChange={setPreviewTheme}
              />
            </div>
          </div>

          {/* Desktop Split Layout */}
          <div className="hidden lg:flex lg:gap-8 xl:gap-12">
            {/* Left Panel - Live Preview */}
            <div className="lg:w-3/6 xl:w-3/6">
              <div className="sticky top-8">
                <div className={`${isDark ? 'bg-gray-900/50' : 'bg-white/50'} backdrop-blur-sm rounded-2xl p-6 border ${isDark ? 'border-black/30' : 'border-gray-200/30'} relative overflow-hidden`}>
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-30">
                     <div className={`w-full h-full ${isDark ? 'bg-black' : 'bg-white'}`} style={{
              backgroundImage: `linear-gradient(${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`,
                       backgroundSize: '20px 20px'
                     }}></div>
                   </div>
                   <div className="relative z-10">
                     <div className="flex items-center gap-2 mb-4">
                       <div className={`w-2 h-2 ${isDark ? 'bg-white' : 'bg-black'} rounded-full animate-pulse`}></div>
                       <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>Live Preview</span>
                     </div>
                    <TweetCard 
                      ref={desktopTweetRef}
                      tweetData={tweetData}
                      liked={liked}
                      retweeted={retweeted}
                      onLike={handleLike}
                      onRetweet={handleRetweet}
                      forcedTheme={previewTheme}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Form */}
            <div className="lg:w-3/6 xl:w-3/6">
              <div className={`${isDark ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm rounded-2xl p-2 border ${isDark ? 'border-gray-500/30' : 'border-gray-400/30'} shadow-xl`}>
                <TweetEditor 
                  tweetData={tweetData}
                  setTweetData={setTweetData}
                  onDownload={handleDownload}
                  onThemeChange={setPreviewTheme}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}

export default TweetGenerator