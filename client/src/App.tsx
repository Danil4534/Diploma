import  { useState } from 'react'

import './App.css'

function App(){
  const [count, setCount] = useState<number>(0)

  const count1: number= 10;
  return (
    <>
    <h1>{count}</h1>
      <h1>{count1}</h1>
    </>
  )
}

export default App
