import { forwardRef } from 'react'
import { Heart, MessageCircle, Repeat2, Share, BarChart3, Bookmark, MoreHorizontal } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import bluetickIcon from '../../assets/bluetick.png'
import verifiedBadgeIcon from '../../assets/twitter-verified-badge-gray-seeklogo.png'

const TweetCard = forwardRef(({ tweetData, liked, retweeted, onLike, onRetweet }, ref) => {
  const { isDark } = useTheme()

  return (
    <div 
      ref={ref}
      className={`${isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 transition-colors duration-300 w-full max-w-[680px] mx-auto`}
    >
      {/* Header */}
      <div className="flex items-start">
        <div className="mr-3 flex-shrink-0">
          {/* Profile Picture */}
          <div className="relative w-10 h-10">
            {tweetData.profileImage ? (
              <img 
                src={tweetData.profileImage} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-700 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm leading-none flex items-center justify-center w-full h-full">
                  {tweetData.displayName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* User Info and Content */}
        <div className="flex-1">
          {/* User Info */}
          <div className="flex items-center gap-1 sm:gap-2 mb-1">
            <h3 className={`${isDark ? 'text-white' : 'text-black'} font-bold hover:underline cursor-pointer text-sm sm:text-[15px] flex items-center gap-1 truncate`}>
              <span className="truncate">{tweetData.displayName}</span>
              {tweetData.verificationBadge && (
                <span className="inline-flex items-center flex-shrink-0">
                  {tweetData.verificationBadge === 'blue' && (
                    <img src={bluetickIcon} alt="Blue tick" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  )}
                  {tweetData.verificationBadge === 'gold' && (
                    <img src={verifiedBadgeIcon} alt="Verified badge" className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  )}
                </span>
              )}
            </h3>
            <span className={`${isDark ? 'text-white/70' : 'text-black/70'} text-sm sm:text-[15px] flex items-center truncate`}>@{tweetData.handle}</span>
            <span className={`${isDark ? 'text-white/70' : 'text-black/70'} text-sm sm:text-[15px] flex items-center flex-shrink-0`}>·</span>
            <span className={`${isDark ? 'text-white/70' : 'text-black/70'} text-sm sm:text-[15px] hover:underline cursor-pointer flex items-center flex-shrink-0`}>
              {tweetData.timestampFormat === 'exact' 
                ? tweetData.customExactTime
                : tweetData.customRelativeTime
              }
            </span>
            <div className="ml-auto flex items-center flex-shrink-0">
              <MoreHorizontal className={`w-4 h-4 sm:w-5 sm:h-5 ${isDark ? 'text-white/70 hover:text-white' : 'text-black/70 hover:text-black'} cursor-pointer transition-colors`} />
            </div>
          </div>
          
          {/* Tweet Content */}
          <div className={`${isDark ? 'text-white' : 'text-black'} text-sm sm:text-[15px] leading-[1.3125] mb-3 mt-2 font-normal whitespace-pre-wrap break-words w-full`}>
            {tweetData.content.split(' ').map((word, index) => {
              if (word.startsWith('#')) {
                return (
                  <span key={index} className={`${isDark ? 'text-gray-300' : 'text-gray-600'} hover:underline cursor-pointer`}>
                    {word}{' '}
                  </span>
                )
              }
              if (word.startsWith('@')) {
                return (
                  <span key={index} className={`${isDark ? 'text-gray-300' : 'text-gray-600'} hover:underline cursor-pointer`}>
                    {word}{' '}
                  </span>
                )
              }
              return <span key={index}>{word} </span>
            })}
          </div>
          
          {/* Media Content */}
          {tweetData.media && (
            <div className="mt-3 flex justify-center">
              {tweetData.mediaType === 'image' ? (
                <img 
                  src={tweetData.media} 
                  alt="Tweet media" 
                  className="max-w-full max-h-96 object-contain rounded-2xl"
                  style={{ background: 'transparent' }}
                />
              ) : (
                <video 
                  src={tweetData.media} 
                  controls 
                  className="max-w-full max-h-96 object-contain rounded-2xl"
                  style={{ background: 'transparent' }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
          
          {/* Engagement Metrics */}
          <div className={`flex justify-between items-center mt-3 ${isDark ? 'text-white/70' : 'text-black/70'} text-xs sm:text-sm`}>
            {/* Comments */}
            <div className="flex items-center group cursor-pointer">
              <div className={`p-1 sm:p-1.5 rounded-full transition-colors ${isDark ? 'group-hover:bg-gray-400/20' : 'group-hover:bg-gray-600/10'}`}>
                <MessageCircle className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isDark ? 'text-white/70 group-hover:text-gray-300' : 'text-black/70 group-hover:text-gray-600'}`} />
              </div>
              <span className={`text-xs sm:text-sm transition-colors ${isDark ? 'text-white/70 group-hover:text-gray-300' : 'text-black/70 group-hover:text-gray-600'}`}>
                {tweetData.comments}
              </span>
            </div>
            
            {/* Retweets */}
            <div 
              className="flex items-center group cursor-pointer"
              onClick={onRetweet}
            >
              <div className={`p-1 sm:p-1.5 rounded-full transition-colors ${isDark ? 'group-hover:bg-gray-400/20' : 'group-hover:bg-gray-600/10'}`}>
                <Repeat2 className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                  retweeted 
                    ? (isDark ? 'text-gray-300' : 'text-gray-600')
                  : (isDark ? 'text-white/70 group-hover:text-gray-300' : 'text-black/70 group-hover:text-gray-600')
                }`} />
              </div>
              <span className={`text-xs sm:text-sm transition-colors ${
                retweeted 
                  ? (isDark ? 'text-gray-300' : 'text-gray-600')
                  : (isDark ? 'text-white/70 group-hover:text-gray-300' : 'text-black/70 group-hover:text-gray-600')
              }`}>
                {tweetData.retweets}
              </span>
            </div>
            
            {/* Likes */}
            <div 
              className="flex items-center group cursor-pointer"
              onClick={onLike}
            >
              <div className={`p-1 sm:p-1.5 rounded-full transition-colors ${isDark ? 'group-hover:bg-red-900/20' : 'group-hover:bg-red-100'}`}>
                <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                  liked 
                    ? 'text-red-500 fill-current' 
                    : (isDark ? 'text-white/70 group-hover:text-red-500' : 'text-black/70 group-hover:text-red-500')
                }`} />
              </div>
              <span className={`text-xs sm:text-sm transition-colors ${
                liked 
                  ? 'text-red-500' 
                  : (isDark ? 'text-white/70 group-hover:text-red-500' : 'text-black/70 group-hover:text-red-500')
              }`}>
                {tweetData.likes}
              </span>
            </div>
            
            {/* Views */}
            <div className="flex items-center group cursor-pointer">
              <div className={`p-1 sm:p-1.5 rounded-full transition-colors ${isDark ? 'group-hover:bg-gray-400/20' : 'group-hover:bg-gray-600/10'}`}>
                <BarChart3 className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isDark ? 'text-white/70 group-hover:text-gray-300' : 'text-black/70 group-hover:text-gray-600'}`} />
              </div>
              <span className={`text-xs sm:text-sm transition-colors ${isDark ? 'text-white/70 group-hover:text-gray-300' : 'text-black/70 group-hover:text-gray-600'}`}>
                {tweetData.views}
              </span>
            </div>
            
            {/* Bookmark & Share */}
            <div className="flex items-center gap-1">
              {/* Bookmark */}
              <div className="flex items-center group cursor-pointer">
                <div className={`p-1 sm:p-1.5 rounded-full transition-colors ${isDark ? 'group-hover:bg-gray-400/20' : 'group-hover:bg-gray-600/10'}`}>
                  <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isDark ? 'text-white/70 group-hover:text-gray-300' : 'text-black/70 group-hover:text-gray-600'}`} />
                </div>
              </div>
              
              {/* Share */}
              <div className="flex items-center group cursor-pointer">
                <div className={`p-1 sm:p-1.5 rounded-full transition-colors ${isDark ? 'group-hover:bg-gray-400/20' : 'group-hover:bg-gray-600/10'}`}>
                  <Share className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${isDark ? 'text-white/70 group-hover:text-gray-300' : 'text-black/70 group-hover:text-gray-600'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

TweetCard.displayName = 'TweetCard'

export default TweetCard