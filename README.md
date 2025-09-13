# Mock Tweet Generator

A modern, responsive React application for generating realistic-looking Twitter/X mock tweets. Perfect for creating social media mockups, presentations, or educational content without needing actual Twitter accounts.

## Features

- **Realistic Tweet Design**: Pixel-perfect recreation of Twitter's interface
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Interactive Elements**: Functional like, retweet, and engagement buttons
- **Media Support**: Upload and display images or videos in tweets
- **Customizable Content**: Edit all tweet elements including:
  - Profile information (name, handle, profile picture)
  - Tweet content with hashtag and mention highlighting
  - Engagement metrics (likes, retweets, comments, views)
  - Verification badges (blue tick, gold verified)
  - Timestamps (relative or exact time)
- **Image Export**: Download generated tweets as high-quality JPG images
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Project Structure

```
src/
├── components/
│   ├── tweet/
│   │   ├── TweetCard.jsx          # Tweet display component
│   │   ├── TweetEditor.jsx        # Tweet customization form
│   │   └── TweetGenerator.jsx     # Main tweet generator component
│   └── ui/
│       ├── Footer.jsx             # Footer component
│       └── ThemeToggle.jsx        # Dark/light mode toggle
├── contexts/
│   └── ThemeContext.jsx           # Theme state management
├── hooks/
│   └── useTweetData.js            # Custom hooks for tweet data and interactions
├── utils/
│   └── imageUtils.js              # Image handling and download utilities
├── styles/
│   └── colors-override.css        # Custom color overrides for Tailwind
├── App.jsx                        # Main application component
├── App.css                        # Application styles
├── index.css                      # Global styles and Tailwind imports
└── main.jsx                       # Application entry point
```

## Technology Stack

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Beautiful, customizable icons
- **html-to-image**: Library for converting DOM elements to images

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd TweetGen
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## Usage

### Basic Tweet Creation

1. **Customize Profile**: Upload a profile picture or use the generated avatar
2. **Set User Information**: Enter display name and handle
3. **Write Tweet Content**: Add your tweet text with support for hashtags and mentions
4. **Add Media** (optional): Upload images or videos
5. **Set Engagement Metrics**: Customize likes, retweets, comments, and views
6. **Choose Verification**: Select no badge, blue tick, or gold verified badge
7. **Set Timestamp**: Choose between relative (2h, 1d) or exact time format

### Downloading Tweets

- Click the "Download JPG" button to save your generated tweet as a high-quality image
- The exported image maintains the exact styling and proportions of the tweet

### Theme Switching

- Use the theme toggle button (sun/moon icon) to switch between light and dark modes
- Theme preference is automatically saved and persists across sessions

## Component Architecture

### Core Components

- **TweetGenerator**: Main container component that orchestrates the entire application
- **TweetCard**: Displays the formatted tweet with all visual elements
- **TweetEditor**: Provides the form interface for customizing tweet properties
- **ThemeToggle**: Handles theme switching functionality
- **Footer**: Displays the application's footer with copyright and links

### Custom Hooks

- **useTweetData**: Manages tweet content and display properties
- **useTweetInteractions**: Handles like and retweet interactions with state management
- **useTheme**: Provides theme context and toggle functionality

### Utilities

- **imageUtils**: Contains functions for image processing, file uploads, and tweet downloading

## Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Code Style

- Uses ES6+ features and modern React patterns
- Functional components with hooks
- Tailwind CSS for styling with custom color overrides
- Responsive design with mobile-first approach

### Adding New Features

1. **New Components**: Add to appropriate folder in `src/components/`
2. **State Management**: Use existing hooks or create new ones in `src/hooks/`
3. **Utilities**: Add helper functions to `src/utils/`
4. **Styling**: Use Tailwind classes with custom overrides in `src/styles/`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Twitter/X for the original design inspiration
- Tailwind CSS team for the excellent utility framework
- Lucide team for the beautiful icon set
- React team for the amazing framework

---

**Note**: This application is for educational and creative purposes only. It is not affiliated with Twitter/X or any social media platform.
