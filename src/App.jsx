import { ThemeProvider } from './contexts/ThemeContext'
import TweetGenerator from './components/tweet/TweetGenerator'
import Footer from './components/ui/Footer'
import './App.css'
import './styles/colors-override.css'

function App() {
  return (
    <ThemeProvider>
      <TweetGenerator />
      <Footer />
    </ThemeProvider>
  )
}

export default App
