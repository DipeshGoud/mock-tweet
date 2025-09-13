import { useRef, useState } from 'react'
import { Upload, Image as ImageIcon, Video, Download, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import { handleFileUpload, handleMediaUpload } from '../../utils/imageUtils'

function TweetEditor({ tweetData, setTweetData, onDownload, onThemeChange }) {
  const { isDark } = useTheme()
  const fileInputRef = useRef(null)
  const mediaInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [dragType, setDragType] = useState(null)
  const [tweetTheme, setTweetTheme] = useState('system')

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
    <div className={`p-4 md:p-6 rounded-lg ${isDark ? 'bg-gray-900' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Tweet Editor</h2>
        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Customize your tweet</p>
      </div>
      
      <div className="space-y-6">
        {/* Profile & User Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Photo */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Profile Photo
            </label>
            {tweetData.profileImage ? (
              <div className={`relative p-3 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-3">
                  <img src={tweetData.profileImage} alt="Profile" className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1">
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Profile uploaded</p>
                    <button
                      onClick={() => setTweetData(prev => ({ ...prev, profileImage: null }))}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                  dragActive && dragType === 'profile'
                    ? (isDark ? 'border-blue-500 bg-blue-500/10' : 'border-blue-500 bg-blue-50')
                    : (isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-800' : 'border-gray-300 hover:border-gray-400 bg-gray-50')
                }`}
                onDragEnter={(e) => handleDrag(e, 'profile')}
                onDragLeave={(e) => handleDrag(e, 'profile')}
                onDragOver={(e) => handleDrag(e, 'profile')}
                onDrop={(e) => handleDrop(e, 'profile')}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Upload profile photo</p>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Click or drag & drop</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Display Name
              </label>
              <input
                type="text"
                value={tweetData.displayName}
                onChange={(e) => setTweetData(prev => ({ ...prev, displayName: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Username
              </label>
              <input
                type="text"
                value={tweetData.handle || '@username'}
                onChange={(e) => setTweetData(prev => ({ ...prev, handle: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="@username"
              />
            </div>
          </div>
        </div>

        {/* Tweet Content */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Tweet Content
          </label>
          <textarea
            value={tweetData.content}
            onChange={(e) => setTweetData(prev => ({ ...prev, content: e.target.value }))}
            rows={4}
            className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none`}
            placeholder="What's happening?"
          />
        </div>

        {/* Media Upload */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Media
          </label>
          {tweetData.media ? (
            <div className={`relative rounded-lg overflow-hidden border ${isDark ? 'border-gray-600' : 'border-gray-300'}`}>
              {tweetData.mediaType === 'video' ? (
                <video src={tweetData.media} className="w-full h-40 object-cover" controls />
              ) : (
                <img src={tweetData.media} alt="Tweet media" className="w-full h-40 object-cover" />
              )}
              <button
                onClick={() => setTweetData(prev => ({ ...prev, media: null, mediaType: null }))}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ) : (
            <div 
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                dragActive && dragType === 'media'
                  ? (isDark ? 'border-blue-500 bg-blue-500/10' : 'border-blue-500 bg-blue-50')
                  : (isDark ? 'border-gray-600 hover:border-gray-500 bg-gray-800' : 'border-gray-300 hover:border-gray-400 bg-gray-50')
              }`}
              onDragEnter={(e) => handleDrag(e, 'media')}
              onDragLeave={(e) => handleDrag(e, 'media')}
              onDragOver={(e) => handleDrag(e, 'media')}
              onDrop={(e) => handleDrop(e, 'media')}
              onClick={() => mediaInputRef.current?.click()}
            >
              <div className="flex justify-center gap-2 mb-2">
                <ImageIcon className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                <Video className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Upload media</p>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Images & Videos</p>
            </div>
          )}
          <input
            ref={mediaInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleMediaChange}
            className="hidden"
          />
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Timestamp */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Timestamp
            </label>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => setTweetData(prev => ({ ...prev, timestampFormat: 'relative' }))}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  tweetData.timestampFormat === 'relative'
                    ? (isDark ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-500 text-white border-blue-500')
                    : (isDark ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50')
                }`}
              >
                Relative
              </button>
              <button
                onClick={() => setTweetData(prev => ({ ...prev, timestampFormat: 'exact' }))}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  tweetData.timestampFormat === 'exact'
                    ? (isDark ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-500 text-white border-blue-500')
                    : (isDark ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50')
                }`}
              >
                Exact
              </button>
            </div>
            {tweetData.timestampFormat === 'relative' ? (
              <input
                type="text"
                value={tweetData.customRelativeTime}
                onChange={(e) => setTweetData(prev => ({ ...prev, customRelativeTime: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="2h, 1d, 3w"
              />
            ) : (
              <input
                type="text"
                value={tweetData.customExactTime}
                onChange={(e) => setTweetData(prev => ({ ...prev, customExactTime: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="12:34 PM"
              />
            )}
          </div>

          {/* Verification Badge */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
              Verification
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setTweetData(prev => ({ ...prev, verificationBadge: null }))}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  !tweetData.verificationBadge
                    ? (isDark ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-500 text-white border-blue-500')
                    : (isDark ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50')
                }`}
              >
                None
              </button>
              <button
                onClick={() => setTweetData(prev => ({ ...prev, verificationBadge: 'blue' }))}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  tweetData.verificationBadge === 'blue'
                    ? (isDark ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-500 text-white border-blue-500')
                    : (isDark ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50')
                }`}
              >
                Blue
              </button>
              <button
                onClick={() => setTweetData(prev => ({ ...prev, verificationBadge: 'gold' }))}
                className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                  tweetData.verificationBadge === 'gold'
                    ? (isDark ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-500 text-white border-blue-500')
                    : (isDark ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50')
                }`}
              >
                Gold
              </button>
            </div>
          </div>
        </div>

        {/* Tweet Theme */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Tweet Theme
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setTweetTheme('system')
                onThemeChange?.('system')
              }}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                tweetTheme === 'system'
                  ? (isDark ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-500 text-white border-blue-500')
                  : (isDark ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50')
              }`}
            >
              System
            </button>
            <button
              onClick={() => {
                setTweetTheme('light')
                onThemeChange?.('light')
              }}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1 ${
                tweetTheme === 'light'
                  ? (isDark ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-500 text-white border-blue-500')
                  : (isDark ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50')
              }`}
            >
              <Sun className="w-4 h-4" />
              Light
            </button>
            <button
              onClick={() => {
                setTweetTheme('dark')
                onThemeChange?.('dark')
              }}
              className={`px-3 py-2 text-sm rounded-lg border transition-colors flex items-center justify-center gap-1 ${
                tweetTheme === 'dark'
                  ? (isDark ? 'bg-blue-600 text-white border-blue-600' : 'bg-blue-500 text-white border-blue-500')
                  : (isDark ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50')
              }`}
            >
              <Moon className="w-4 h-4" />
              Dark
            </button>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div>
          <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            Engagement Metrics
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Likes</label>
              <input
                type="text"
                value={tweetData.likes}
                onChange={(e) => setTweetData(prev => ({ ...prev, likes: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="42"
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Retweets</label>
              <input
                type="text"
                value={tweetData.retweets}
                onChange={(e) => setTweetData(prev => ({ ...prev, retweets: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="12"
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Comments</label>
              <input
                type="text"
                value={tweetData.comments}
                onChange={(e) => setTweetData(prev => ({ ...prev, comments: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="8"
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Views</label>
              <input
                type="text"
                value={tweetData.views}
                onChange={(e) => setTweetData(prev => ({ ...prev, views: e.target.value }))}
                className={`w-full px-3 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="1.2k"
              />
            </div>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={() => onDownload(tweetTheme)}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
            isDark 
              ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' 
              : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
          }`}
        >
          <Download className="w-5 h-5" />
          Download Tweet
        </button>
      </div>
    </div>
  )
}

export default TweetEditor