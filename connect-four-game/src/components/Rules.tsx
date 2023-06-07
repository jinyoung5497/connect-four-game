import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../slices/store'
import { icon_check } from '../assets'
import { toggleMainMenu } from '../slices/gameSlice'

export default function Rules() {
  const dispatch = useDispatch()
  const games = useSelector((state: RootState) => state.games.value)

  const menuClose = () => {
    dispatch(toggleMainMenu())
  }

  return (
    <>
      <div
        className={`bg-purple absolute top-0 w-full h-full flex justify-center items-center ${
          games.mainMenuToggle ? 'block' : 'hidden'
        }`}
      >
        <div
          className='w-[500px] bg-white border-[3px] border-black border-b-[15px]
         rounded-3xl flex flex-col items-center justify-center p-10'
        >
          <h1 className='text-xl font-bold mb-4'>RULES</h1>
          <div>
            <h2 className='text-purple text-md font-bold mb-4'>OBJECTIVE</h2>
            <p className='text-gray-600'>
              Be the first player to connect 4 of the same coloured discs in a
              row (either vertically, horizontally, or diagonally).
            </p>
          </div>
          <div>
            <h2 className='text-purple text-md font-bold my-4'>HOW TO PLAY</h2>
            <ol className='flex flex-col gap-2'>
              <div className='flex gap-3 items-start'>
                <p className='font-bold'>1</p>
                <li className='text-gray-600'>
                  Red goes first in the first game.
                </li>
              </div>
              <div className='flex gap-3 items-start'>
                <p className='font-bold'>2</p>
                <li className='text-gray-600'>
                  Players must alternate turns, and only one disc can be dropped
                  in each turn.
                </li>
              </div>
              <div className='flex gap-3 items-start'>
                <p className='font-bold'>3</p>
                <li className='text-gray-600'>
                  The game ends where there is a 4-in-a-row or a stalemate.
                </li>
              </div>
              <div className='flex gap-3 items-start'>
                <p className='font-bold'>4</p>
                <li className='text-gray-600'>
                  The starter of the previous game goes second on the next game.
                </li>
              </div>
            </ol>
          </div>
          <img
            src={icon_check}
            alt='icon_check'
            onClick={menuClose}
            className='absolute bottom-40 cursor-pointer'
          />
        </div>
      </div>
    </>
  )
}
