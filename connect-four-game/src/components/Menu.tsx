import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../slices/store'
import { menuToggle, quitGame } from '../slices/gameSlice'

export default function Menu() {
  const games = useSelector((state: RootState) => state.games.value)
  const dispatch = useDispatch()

  return (
    <>
      <div
        className={`z-20 bg-[#00000046] absolute top-0 w-full h-full flex items-center justify-center ${
          games.menuToggle ? 'block' : 'hidden'
        }`}
      >
        <div
          className='bg-purple-light flex flex-col w-[500px] justify-center items-center p-10 border-[3px] border-black border-b-[15px]
         rounded-3xl '
        >
          <h1 className='text-xl font-bold text-white mb-10'>PAUSE</h1>
          <button
            className='bg-white p-5 w-full mb-4 border-[3px] border-black border-b-[15px]
         rounded-3xl font-bold text-lg'
            onClick={() => dispatch(menuToggle())}
          >
            CONTINUE GAME
          </button>
          <button
            className='bg-white p-5 w-full mb-4 border-[3px] border-black border-b-[15px]
         rounded-3xl font-bold text-lg'
          >
            RESTART
          </button>
          <button
            className='bg-pink p-5 w-full border-[3px] border-black border-b-[15px]
         rounded-3xl text-white font-bold text-lg'
            onClick={() => dispatch(quitGame())}
          >
            QUIT GAME
          </button>
        </div>
      </div>
    </>
  )
}
