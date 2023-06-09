import React from 'react'
import { Mainmenu, GameBoard, Rules, Menu, WinStatus } from './components'

function App() {
  return (
    <>
      <div className='h-full'>
        <WinStatus />
        <Menu />
        <Rules />
        <GameBoard />
        <Mainmenu />
      </div>
    </>
  )
}

export default App
