import { useRef, useState } from 'react'
import { Camera, Upload, Download, Sparkles, Image as ImageIcon, Video } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { handleFileUpload, handleMediaUpload } from '../../utils/imageUtils'

function TweetEditor({ tweetData, setTweetData, onDownload }) {
  const { isDark } = useTheme()
  const fileInputRef = useRef(null)
  const mediaInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [dragType, setDragType] = useState(null) // 'profile' or 'media'

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFileUpload(file, (imageUrl) => {
        setTweetData(prev => ({ ...prev, profileImage: imageUrl }))
      })
    }
  }

  const handleMediaChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleMediaUpload(file, (result) => {
        setTweetData(prev => ({ ...prev, media: result.media, mediaType: result.mediaType }))
      })
    }
  }

  const handleDrag = (e, type) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
      setDragType(type)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
      setDragType(null)
    }
  }

  const handleDrop = (e, type) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setDragType(null)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (type === 'profile') {
        handleFileUpload(file, (imageUrl) => {
          setTweetData(prev => ({ ...prev, profileImage: imageUrl }))
        })
      } else if (type === 'media') {
        handleMediaUpload(file, (result) => {
          setTweetData(prev => ({ ...prev, media: result.media, mediaType: result.mediaType }))
        })
      }
    }
  }

  return (
    <div className={`p-6 lg:p-8 rounded-2xl ${isDark ? 'bg-black/40' : 'bg-white/80'} backdrop-blur-sm border ${isDark ? 'border-gray-600/30' : 'border-gray-300/30'} shadow-xl transition-all duration-300`}>
      <div className="flex items-center gap-3 mb-6 lg:mb-8">
        <div className={`p-2 rounded-xl ${isDark ? 'bg-gradient-to-r from-gray-700 to-black' : 'bg-gradient-to-r from-gray-300 to-gray-600'} shadow-lg`}>
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h2 className={`${isDark ? 'text-white' : 'text-black'} text-xl lg:text-2xl font-bold bg-gradient-to-r ${isDark ? 'from-gray-400 to-white' : 'from-gray-600 to-black'} bg-clip-text text-transparent`}>
          Customize Your Tweet
        </h2>
      </div>
      
      <div className="space-y-6 lg:space-y-8">
        {/* Profile Photo Section */}
        <div className="space-y-4">
          <label className={`block ${isDark ? 'text-white' : 'text-black'} text-sm font-semibold mb-3`}>Profile Photo</label>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full ${isDark ? 'bg-black/50' : 'bg-white'} flex items-center justify-center overflow-hidden border-2 ${isDark ? 'border-gray-600/50' : 'border-gray-300/30'} shadow-lg`}>
               {tweetData.profileImage ? (
                 <img src={tweetData.profileImage} alt="Profile" className="w-full h-full object-cover" />
               ) : (
                 <Camera className={`w-8 h-8 lg:w-10 lg:h-10 ${isDark ? 'text-white' : 'text-black'}`} />
               )}
             </div>
            
            {/* Drag and Drop Area */}
            <div 
              className={`flex-1 min-h-[120px] border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                dragActive && dragType === 'profile'
                  ? (isDark ? 'border-gray-400 bg-gray-400/10' : 'border-gray-600 bg-gray-600/10')
                  : (isDark ? 'border-gray-600 hover:border-gray-400 bg-black/30' : 'border-gray-300/50 hover:border-gray-600 bg-white/50')
              }`}
              onDragEnter={(e) => handleDrag(e, 'profile')}
              onDragLeave={(e) => handleDrag(e, 'profile')}
              onDragOver={(e) => handleDrag(e, 'profile')}
              onDrop={(e) => handleDrop(e, 'profile')}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="flex flex-col items-center justify-center text-center space-y-3">
                <div className={`p-3 rounded-full ${isDark ? 'bg-black' : 'bg-white border border-gray-300'}`}>
                  <Upload className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
                </div>
                <div>
                  <p className={`${isDark ? 'text-white' : 'text-black'} font-medium`}>
                    Drop your profile photo here
                  </p>
                  <p className={`${isDark ? 'text-white/60' : 'text-black/60'} text-sm mt-1`}>
                    or click to browse files
                  </p>
                </div>
              </div>
            </div>
            
            {tweetData.profileImage && (
              <button
                onClick={() => setTweetData(prev => ({ ...prev, profileImage: null }))}
                className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                  isDark 
                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30' 
                    : 'bg-red-100 hover:bg-red-200 text-red-700 border border-red-300'
                }`}
              >
                Remove Photo
              </button>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>
        </div>
        
        {/* Timestamp Format Section */}
        <div className="space-y-4">
          <label className={`block ${isDark ? 'text-white' : 'text-black'} text-sm font-semibold mb-3`}>Timestamp Format</label>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setTweetData(prev => ({ ...prev, timestampFormat: 'relative' }))}
                className={`px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                  tweetData.timestampFormat === 'relative'
                    ? (isDark ? 'bg-gray-600 text-white shadow-lg' : 'bg-black text-white shadow-lg')
                    : (isDark ? 'bg-black/50 hover:bg-black text-white border border-gray-600' : 'bg-white hover:bg-white/80 text-black border border-gray-300')
                }`}
              >
                Relative (e.g., "2h")
              </button>
              <button
                onClick={() => setTweetData(prev => ({ ...prev, timestampFormat: 'exact' }))}
                className={`px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                  tweetData.timestampFormat === 'exact'
                    ? (isDark ? 'bg-gray-600 text-white shadow-lg' : 'bg-black text-white shadow-lg')
                    : (isDark ? 'bg-black/50 hover:bg-black text-white border border-gray-600' : 'bg-white hover:bg-white/80 text-black border border-gray-300')
                }`}
              >
                Exact (e.g., "12:34 PM")
              </button>
            </div>
            
            {tweetData.timestampFormat === 'relative' ? (
              <input
                type="text"
                value={tweetData.customRelativeTime}
                onChange={(e) => setTweetData(prev => ({ ...prev, customRelativeTime: e.target.value }))}
                className={`w-full sm:w-48 ${isDark ? 'bg-black/50 border-gray-600 text-white placeholder-white/60' : 'bg-white border-gray-300 text-black placeholder-black/60'} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 transition-all duration-300 text-sm shadow-sm`}
                placeholder="e.g., 2h, 1d, 3w"
              />
            ) : (
              <input
                type="text"
                value={tweetData.customExactTime}
                onChange={(e) => setTweetData(prev => ({ ...prev, customExactTime: e.target.value }))}
                className={`w-full sm:w-48 ${isDark ? 'bg-black/50 border-gray-600 text-white placeholder-white/60' : 'bg-white border-gray-300 text-black placeholder-black/60'} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 transition-all duration-300 text-sm shadow-sm`}
                placeholder="e.g., 12:34 PM"
              />
            )}
          </div>
        </div>

        {/* Verification Badge Section */}
        <div className="space-y-4">
          <label className={`block ${isDark ? 'text-white' : 'text-black'} text-sm font-semibold mb-3`}>Verification Badge</label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setTweetData(prev => ({ ...prev, verificationBadge: null }))}
              className={`px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                !tweetData.verificationBadge
                  ? (isDark ? 'bg-gray-600 text-white shadow-lg' : 'bg-black text-white shadow-lg')
                  : (isDark ? 'bg-black/50 hover:bg-black text-white border border-gray-600' : 'bg-white hover:bg-white/80 text-black border border-gray-300')
              }`}
            >
              None
            </button>
            <button
              onClick={() => setTweetData(prev => ({ ...prev, verificationBadge: 'blue' }))}
              className={`px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2 ${
                tweetData.verificationBadge === 'blue'
                  ? (isDark ? 'bg-gray-600 text-white shadow-lg' : 'bg-black text-white shadow-lg')
                  : (isDark ? 'bg-black/50 hover:bg-black text-white border border-gray-600' : 'bg-white hover:bg-white/80 text-black border border-gray-300')
              }`}
            >
              Blue Checkmark
            </button>
            <button
              onClick={() => setTweetData(prev => ({ ...prev, verificationBadge: 'gold' }))}
              className={`px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2 ${
                tweetData.verificationBadge === 'gold'
                  ? (isDark ? 'bg-gray-600 text-white shadow-lg' : 'bg-black text-white shadow-lg')
                  : (isDark ? 'bg-black/50 hover:bg-black text-white border border-gray-600' : 'bg-white hover:bg-white/80 text-black border border-gray-300')
              }`}
            >
              Verify Badge
            </button>
          </div>
        </div>

        {/* Media Upload Section */}
        <div className="space-y-4">
          <label className={`block ${isDark ? 'text-white' : 'text-black'} text-sm font-semibold mb-3`}>Media (Image/Video)</label>
          
          {/* Media Preview */}
          {tweetData.media && (
            <div className={`relative rounded-xl overflow-hidden border-2 ${isDark ? 'border-gray-500/50' : 'border-gray-400/30'} shadow-lg`}>
              {tweetData.mediaType === 'video' ? (
                <video src={tweetData.media} className="w-full h-48 object-cover" controls />
              ) : (
                <img src={tweetData.media} alt="Tweet media" className="w-full h-48 object-cover" />
              )}
              <button
                onClick={() => setTweetData(prev => ({ ...prev, media: null, mediaType: null }))}
                className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-300 ${
                  isDark 
                    ? 'bg-red-600/80 hover:bg-red-600 text-white' 
                    : 'bg-red-500/80 hover:bg-red-500 text-white'
                } backdrop-blur-sm`}
              >
                ×
              </button>
            </div>
          )}
          
          {/* Drag and Drop Area */}
          <div 
            className={`min-h-[140px] border-2 border-dashed rounded-xl p-6 transition-all duration-300 cursor-pointer ${
              dragActive && dragType === 'media'
                ? (isDark ? 'border-gray-400 bg-gray-400/10' : 'border-gray-600 bg-gray-600/10')
                : (isDark ? 'border-gray-600 hover:border-gray-400 bg-black/30' : 'border-gray-300/50 hover:border-gray-600 bg-white/50')
            }`}
            onDragEnter={(e) => handleDrag(e, 'media')}
            onDragLeave={(e) => handleDrag(e, 'media')}
            onDragOver={(e) => handleDrag(e, 'media')}
            onDrop={(e) => handleDrop(e, 'media')}
            onClick={() => mediaInputRef.current?.click()}
          >
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="flex gap-3">
                <div className={`p-3 rounded-full ${isDark ? 'bg-black' : 'bg-white border border-gray-300'}`}>
                  <ImageIcon className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
                </div>
                <div className={`p-3 rounded-full ${isDark ? 'bg-black' : 'bg-white border border-gray-300'}`}>
                  <Video className={`w-6 h-6 ${isDark ? 'text-white' : 'text-black'}`} />
                </div>
              </div>
              <div>
                <p className={`${isDark ? 'text-white' : 'text-black'} font-medium`}>
                  Drop your media here
                </p>
                <p className={`${isDark ? 'text-white/60' : 'text-black/60'} text-sm mt-1`}>
                  Support images and videos • Click to browse
                </p>
              </div>
            </div>
          </div>
          
          <input
            ref={mediaInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="hidden"
          />
        </div>

        {/* User Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className={`block ${isDark ? 'text-white' : 'text-black'} text-sm font-semibold`}>Display Name</label>
            <input
              type="text"
              value={tweetData.displayName}
              onChange={(e) => setTweetData(prev => ({ ...prev, displayName: e.target.value }))}
              className={`w-full ${isDark ? 'bg-black/50 border-gray-600 text-white placeholder-white/60' : 'bg-white border-gray-300 text-black placeholder-black/60'} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 transition-all duration-300 text-sm shadow-sm`}
              placeholder="Your Name"
            />
          </div>
          <div className="space-y-2">
            <label className={`block ${isDark ? 'text-white' : 'text-black'} text-sm font-semibold`}>Username</label>
            <input
              type="text"
              value={tweetData.handle || '@username'}
              onChange={(e) => setTweetData(prev => ({ ...prev, handle: e.target.value }))}
              className={`w-full ${isDark ? 'bg-black/50 border-gray-600 text-white placeholder-white/60' : 'bg-white border-gray-300 text-black placeholder-black/60'} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 transition-all duration-300 text-sm shadow-sm`}
              placeholder="@username"
            />
          </div>
        </div>

        {/* Tweet Content */}
        <div className="space-y-2">
          <label className={`block ${isDark ? 'text-white' : 'text-black'} text-sm font-semibold`}>Tweet Content</label>
          <textarea
            value={tweetData.content}
            onChange={(e) => setTweetData(prev => ({ ...prev, content: e.target.value }))}
            rows={4}
            className={`w-full ${isDark ? 'bg-black/50 border-gray-600 text-white placeholder-white/60' : 'bg-white border-gray-300 text-black placeholder-black/60'} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 resize-none transition-all duration-300 text-sm shadow-sm`}
            placeholder="What's happening?"
          />
        </div>

        {/* Engagement Metrics */}
        <div className="space-y-4">
          <label className={`block ${isDark ? 'text-white' : 'text-black'} text-sm font-semibold`}>Engagement Metrics</label>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className={`block ${isDark ? 'text-white/80' : 'text-black/80'} text-xs font-medium`}>❤️ Likes</label>
              <input
                type="text"
                value={tweetData.likes}
                onChange={(e) => setTweetData(prev => ({ ...prev, likes: e.target.value }))}
                className={`w-full ${isDark ? 'bg-black/50 border-gray-600 text-white placeholder-white/60' : 'bg-white border-gray-300 text-black placeholder-black/60'} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 transition-all duration-300 text-sm shadow-sm`}
                placeholder="42 or 4.2k"
              />
            </div>
            <div className="space-y-2">
              <label className={`block ${isDark ? 'text-white/80' : 'text-black/80'} text-xs font-medium`}>🔄 Retweets</label>
              <input
                type="text"
                value={tweetData.retweets}
                onChange={(e) => setTweetData(prev => ({ ...prev, retweets: e.target.value }))}
                className={`w-full ${isDark ? 'bg-black/50 border-gray-600 text-white placeholder-white/60' : 'bg-white border-gray-300 text-black placeholder-black/60'} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 transition-all duration-300 text-sm shadow-sm`}
                placeholder="12 or 1.2k"
              />
            </div>
            <div className="space-y-2">
              <label className={`block ${isDark ? 'text-white/80' : 'text-black/80'} text-xs font-medium`}>💬 Comments</label>
              <input
                type="text"
                value={tweetData.comments}
                onChange={(e) => setTweetData(prev => ({ ...prev, comments: e.target.value }))}
                className={`w-full ${isDark ? 'bg-black/50 border-gray-600 text-white placeholder-white/60' : 'bg-white border-gray-300 text-black placeholder-black/60'} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 transition-all duration-300 text-sm shadow-sm`}
                placeholder="8 or 800"
              />
            </div>
            <div className="space-y-2">
              <label className={`block ${isDark ? 'text-white/80' : 'text-black/80'} text-xs font-medium`}>👁️ Views</label>
              <input
                type="text"
                value={tweetData.views}
                onChange={(e) => setTweetData(prev => ({ ...prev, views: e.target.value }))}
                className={`w-full ${isDark ? 'bg-black/50 border-gray-600 text-white placeholder-white/60' : 'bg-white border-gray-300 text-black placeholder-black/60'} border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500 transition-all duration-300 text-sm shadow-sm`}
                placeholder="1.2k or 1.2M"
              />
            </div>
          </div>
        </div>
        {/* Download Button */}
        <div className={`pt-4 border-t ${isDark ? 'border-gray-600/20' : 'border-gray-400/20'}`}>
          <button
            onClick={onDownload}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg ${isDark ? 'bg-gradient-to-r from-gray-700 to-black hover:from-gray-600 hover:to-gray-900' : 'bg-gradient-to-r from-gray-400 to-gray-700 hover:from-gray-300 hover:to-gray-600'}`}
          >
            <Download className="w-5 h-5" />
            <span>Download Tweet Image</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TweetEditor