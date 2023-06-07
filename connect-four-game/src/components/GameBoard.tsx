import React, { useEffect } from 'react'
import {
  board_black_large,
  board_black_small,
  board_white_large,
  board_white_small,
  counter_red_large,
  counter_red_small,
  counter_yellow_large,
  counter_yellow_small,
  cpu,
  icon_check,
  logo,
  marker_red,
  marker_yellow,
  player_one,
  player_two,
  pvc,
  pvp,
  bg_red,
  bg_yellow,
  you,
} from '../assets'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../slices/store'
import { menuToggle } from '../slices/gameSlice'

export default function GameBoard() {
  const dispatch = useDispatch()
  const games = useSelector((state: RootState) => state.games.value)

  const openMenu = () => {
    dispatch(menuToggle())
  }

  useEffect(() => {
    console.log(games.menuToggle)
  }, [games.menuToggle])

  return (
    <>
      <div
        className={`absolute top-0 w-full flex flex-col items-center h-full bg-purple-light ${
          games.pvpToggle ? 'block' : 'hidden'
        }`}
      >
        <div className='flex items-center justify-between w-[600px] my-16'>
          <button
            className='bg-purple p-5 rounded-full h-6 font-bold text-white flex items-center justify-center'
            onClick={openMenu}
          >
            MENU
          </button>
          <img src={logo} alt='logo' />
          <button className='bg-purple p-5 rounded-full h-6 font-bold text-white flex items-center justify-center'>
            RESTART
          </button>
        </div>
        {/* board */}
        <div className='grid grid-cols-1 grid-row-1 w-fit'>
          <img
            src={board_white_large}
            alt='board_white_large'
            className='col-start-1 row-start-1 z-10'
          />
          <img
            src={board_black_large}
            alt='board_black_large'
            className='col-start-1 row-start-1 z-0'
          />
        </div>
      </div>
    </>
  )
}
