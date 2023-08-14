import './App.css'
import { GameContextProvider } from './components/GameContext'
import { Route } from 'wouter'
import StartScreen from './screens/StartScreen'
import SettingsScreen from './screens/SettingsScreen'
import GameScreen from './screens/GameScreen'

function App() {  
  return (
    <GameContextProvider>
      <Route path="/">
        <StartScreen/>
      </Route>
      <Route path="/game">
        <GameScreen/>
      </Route>
      <Route path="/settings">
        <SettingsScreen/>
      </Route>
    </GameContextProvider>
  )
}

export default App
