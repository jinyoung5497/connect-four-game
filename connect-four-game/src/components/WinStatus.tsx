import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../slices/store'
import {
  restart,
  playerScore,
  startTimer,
  resetTimer,
  stopTimer,
  playerTurn,
} from '../slices/gameSlice'

export default function WinStatus() {
  const dispatch = useDispatch()
  const games = useSelector((state: RootState) => state.games.value)

  const playAgain = () => {
    dispatch(playerScore())
    dispatch(resetTimer(true))
    dispatch(startTimer(true))
    dispatch(stopTimer(false))
    if (games.stalemate) {
      dispatch(playerTurn())
    }
  }

  return (
    <>
      <div
        className={`flex bg-[#00000000] w-full h-[800px] justify-center absolute bottom-0 z-50 ${
          games.gameOver ? 'block' : 'hidden'
        }`}
      >
        <div className='absolute bg-white w-72 h-44 bottom-9 rounded-3xl border-[3px] border-black drop-shadow-[0_10px_0_rgb(0,0,0)] flex flex-col items-center'>
          <p className='text-md font-bold relative top-3'>
            PLAYER {games.stalemate ? ' ' : games.playerOneWin ? 1 : 2}
          </p>
          <p className='text-xl font-bold relative top-1'>
            {games.stalemate ? 'DRAW' : 'WINS'}
          </p>
          <button
            className='bg-purple p-3 px-5 rounded-full text-white hover:bg-pink'
            onClick={playAgain}
          >
            PLAY AGAIN
          </button>
        </div>
      </div>
    </>
  )
}
