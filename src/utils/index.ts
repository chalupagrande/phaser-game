export const Direction = {
  UP: [0, -1],
  DOWN: [0, 1],
  LEFT: [-1, 0],
  RIGHT: [1, 0]
} as const

export const random = (upperBound:number)=> { 
  return Math.floor(Math.random() * upperBound);
}

export const pickRandom = (arr:any[]) => {
  return arr[random(arr.length)];
}