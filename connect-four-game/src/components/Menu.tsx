import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../slices/store'
import {
  menuToggle,
  quitGame,
  resetTimer,
  restart,
  startTimer,
  stopTimer,
} from '../slices/gameSlice'

export default function Menu() {
  const games = useSelector((state: RootState) => state.games.value)
  const dispatch = useDispatch()
  const modalRef = useRef<HTMLDivElement>(null)

  const continueGame = () => {
    dispatch(menuToggle())
    dispatch(startTimer(true))
    dispatch(stopTimer(false))
  }

  const handleRestart = () => {
    dispatch(restart())
    dispatch(menuToggle())
    dispatch(resetTimer(true))
    dispatch(startTimer(true))
    dispatch(stopTimer(false))
  }

  const quitingGame = () => {
    dispatch(quitGame())
    dispatch(resetTimer(true))
  }

  useEffect(() => {
    if (games.menuToggle) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [games.menuToggle])

  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      continueGame()
    }
  }

  return (
    <>
      <div
        className={`z-50 bg-[#00000046] absolute top-0 w-full h-full flex items-center justify-center ${
          games.menuToggle ? 'block' : 'hidden'
        }`}
      >
        <div
          className='bg-purple-light flex flex-col w-[500px] justify-center items-center p-10 border-[3px] border-black drop-shadow-[0_10px_0_rgb(0,0,0)] rounded-3xl '
          ref={modalRef}
        >
          <h1 className='text-xl font-bold text-white mb-10'>PAUSE</h1>
          <button
            className='bg-white p-5 w-full mb-6 border-[3px] border-black drop-shadow-[0_10px_0_rgb(0,0,0)] rounded-3xl font-bold text-lg hover:drop-shadow-[0_10px_0_#5C2DD5]'
            onClick={continueGame}
          >
            CONTINUE GAME
          </button>
          <button
            className='bg-white p-5 w-full mb-6 border-[3px] border-black drop-shadow-[0_10px_0_rgb(0,0,0)] rounded-3xl font-bold text-lg hover:drop-shadow-[0_10px_0_#5C2DD5]'
            onClick={handleRestart}
          >
            RESTART
          </button>
          <button
            className='bg-pink p-5 w-full border-[3px] border-black drop-shadow-[0_10px_0_rgb(0,0,0)] rounded-3xl text-white font-bold text-lg hover:drop-shadow-[0_10px_0_#5C2DD5]'
            onClick={quitingGame}
          >
            QUIT GAME
          </button>
        </div>
      </div>
    </>
  )
}
