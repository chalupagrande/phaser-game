export const Scoreboard = ({scores}: {scores: number[]})=> {
  return (
    <div>
      p1: {scores?.[0] || 0}<br/>
      p2: {scores?.[1] || 0}
    </div>
  )
}