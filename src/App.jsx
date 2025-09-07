import { ThemeProvider } from './contexts/ThemeContext'
import TweetGenerator from './components/tweet/TweetGenerator'
import './App.css'
import './styles/colors-override.css'

function App() {
  return (
    <ThemeProvider>
      <TweetGenerator />
    </ThemeProvider>
  )
}

export default App
