import { useState } from 'react'

/**
 * Custom hook for managing tweet data state
 * @returns {Object} Tweet data state and setter function
 */
export const useTweetData = () => {
  const [tweetData, setTweetData] = useState({
    displayName: 'Tweet Generator',
    handle: 'tweetgen',
    timestamp: '1h',
    content: 'Hi everyone! 👋 Welcome to Tweet Generator - Create and customize beautiful tweet mockups in seconds! ✨ #TweetGen #Design #SocialMedia',
    likes: '128',
    retweets: '45',
    comments: '23',
    views: '2,849',
    profileImage: null,
    media: null,
    mediaType: null, // 'image' or 'video'
    verificationBadge: null, // 'blue', 'gold', 'business', 'government', 'premium'
    timestampFormat: 'relative', // 'relative' or 'exact'
    customRelativeTime: '1h',
    customExactTime: '12:34 PM'
  })

  return { tweetData, setTweetData }
}

/**
 * Custom hook for managing tweet interactions (likes, retweets)
 * @param {Object} tweetData - Current tweet data
 * @param {Function} setTweetData - Tweet data setter function
 * @returns {Object} Interaction states and handlers
 */
export const useTweetInteractions = (tweetData, setTweetData) => {
  const [liked, setLiked] = useState(false)
  const [retweeted, setRetweeted] = useState(false)

  const handleLike = () => {
    setLiked(!liked)
    const currentLikes = parseInt(tweetData.likes.replace(/,/g, '')) || 0
    setTweetData(prev => ({
      ...prev,
      likes: String(liked ? currentLikes - 1 : currentLikes + 1)
    }))
  }

  const handleRetweet = () => {
    setRetweeted(!retweeted)
    const currentRetweets = parseInt(tweetData.retweets.replace(/,/g, '')) || 0
    setTweetData(prev => ({
      ...prev,
      retweets: String(retweeted ? currentRetweets - 1 : currentRetweets + 1)
    }))
  }

  return {
    liked,
    retweeted,
    handleLike,
    handleRetweet
  }
}