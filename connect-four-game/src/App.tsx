import React from 'react'
import { Mainmenu, GameBoard, Rules, Menu } from './components'

function App() {
  return (
    <>
      <div className='h-full'>
        <Menu />
        <Rules />
        <GameBoard />
        <Mainmenu />
      </div>
    </>
  )
}

export default App
