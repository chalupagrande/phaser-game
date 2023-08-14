import React from 'react'
import { Link} from 'wouter'
import { GameContext } from '../components/GameContext'



const SettingsScreen = () => {
  const {updateGameOptions, gameOptions} = React.useContext(GameContext)
  const [settings, setSettings] = React.useState(gameOptions)

  const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=> {
    console.log(event.target.value)
    setSettings({...settings, [event.target.id]: event.target.value})
  }

  const onSave = () => {
    updateGameOptions(settings)
  }

  return (
    <div>
      <h1>Settings</h1>
      <ul className="column">
        <li className="column">
          <label htmlFor="boardTileWidth">Board Width (in tiles)</label>
          <input id="boardTileWidth" onChange={handleChange} value={settings.boardTileWidth}></input>
        </li>     
        <li className="column">
          <label htmlFor="boardTileHeight">Board Height (in tiles)</label>
          <input id="boardTileHeight" onChange={handleChange} value={settings.boardTileHeight}></input>
        </li>
        <li className="column">
          <label htmlFor="tileSize">Tile Size</label>
          <input id="tileSize" onChange={handleChange} value={settings.tileSize}></input>
        </li>     
        <li className="column">
          <label htmlFor="initialBallSpeed">Initial Ball Speed</label>
          <input id="initialBallSpeed" onChange={handleChange} value={settings.initialBallSpeed}></input>
        </li>     
      </ul>
      <div className="column">
        <button className="start" onClick={onSave}>Save Settings</button>
        <Link href="/"><a>Back</a></Link>
      </div>
    </div>
  )
}

export default SettingsScreen