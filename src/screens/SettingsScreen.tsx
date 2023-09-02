import React from 'react'
import { Link} from 'wouter'
import { GameContext } from '../components/GameContext'



const SettingsScreen = () => {
  const {updateGameSettings, gameSettings} = React.useContext(GameContext)
  const [settings, setSettings] = React.useState(gameSettings)

  const handleChangeNum=(event:React.ChangeEvent<HTMLInputElement>)=> {
    setSettings({...settings, [event.target.id]: parseInt(event.target.value)})
  }

  const handleChangeChecked=(event:React.ChangeEvent<HTMLInputElement>)=> {
    setSettings({...settings, [event.target.id]: event.target.checked})
  }

  const onSave = () => {
    updateGameSettings(settings)
  }

  return (
    <div>
      <h1>Settings</h1>
      <ul className="column">
        <li className="column">
          <label htmlFor="boardTileWidth">Board Width (in tiles)</label>
          <input id="boardTileWidth" onChange={handleChangeNum} value={settings.boardTileWidth}></input>
        </li>     
        <li className="column">
          <label htmlFor="boardTileHeight">Board Height (in tiles)</label>
          <input id="boardTileHeight" onChange={handleChangeNum} value={settings.boardTileHeight}></input>
        </li>
        <li className="column">
          <label htmlFor="tileSize">Tile Size (pixels)</label>
          <input id="tileSize" onChange={handleChangeNum} value={settings.tileSize}></input>
        </li>     
        <li className="column">
          <label htmlFor="initialBallSpeed">Initial Ball Speed</label>
          <input id="initialBallSpeed" onChange={handleChangeNum} value={settings.initialBallSpeed}></input>
        </li>
        <li className="column">
          <label htmlFor="ballSize">Ball Size (pixels)</label>
          <input id="ballSize" onChange={handleChangeNum} value={settings.ballSize}></input>
        </li>
        <li className="column">
          <label htmlFor="showTileAction">Show Tile Action</label>
          <input id="showTileAction" type="checkbox" checked={settings.showTileAction} onChange={handleChangeChecked}></input>
        </li>
        <li className="column">
          <label htmlFor="bankSize">BankSize</label>
          <input id="bankSize" value={settings.bankSize} onChange={handleChangeNum}></input>
        </li>
        <li className="column">
          <label htmlFor="feedSize">Feed Size</label>
          <input id="feedSize" value={settings.feedSize} onChange={handleChangeNum}></input>
        </li>
        <li className="column">
          <label htmlFor="boardQueueSize">Board Queue Size</label>
          <input id="boardQueueSize" value={settings.boardQueueSize} onChange={handleChangeNum}></input>
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