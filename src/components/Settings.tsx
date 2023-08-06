import React, {useState} from 'react'

export const Settings = () => {
  const [width, setWidth] = useState<number>(10)
  const [height, setHeight] = useState<number>(10)


  return (
    <div>
      <h1>Settings</h1>
      <div>
        <label>Width</label>
        <input type="number" value={width} onChange={e => setWidth(parseInt(e.target.value))} />
        <label>Height</label>
        <input type="number" value={height} onChange={e => setHeight(parseInt(e.target.value))} />
      </div>
    </div>
  )
}