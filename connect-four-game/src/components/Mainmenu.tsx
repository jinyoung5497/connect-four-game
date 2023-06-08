import React, { useState, useEffect } from 'react'
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
import { toggleMainMenu, pvpToggle } from '../slices/gameSlice'

export default function Mainmenu() {
  const dispatch = useDispatch()
  const games = useSelector((state: RootState) => state.games.value)

  const openPVP = () => {
    dispatch(pvpToggle())
    dispatch(toggleMainMenu())
  }

  const openMenu = () => {
    dispatch(toggleMainMenu())
  }

  return (
    <>
      <div
        className={`bg-purple h-full flex items-center justify-center ${
          games.mainMenuToggle ? 'hidden' : 'block'
        }`}
      >
        <div className='bg-purple-light w-[500px] flex flex-col items-center justify-center p-5 px-10 rounded-[50px] border-[3px] border-black drop-shadow-[0_10px_0_rgb(0,0,0)]  '>
          <img src={logo} alt='logo' className='my-10 mb-20' />
          <div
            className='flex bg-yellow items-center justify-between mb-8 p-4 rounded-3xl w-full border-[3px] border-black drop-shadow-[0_10px_0_rgb(0,0,0)]  cursor-pointer hover:drop-shadow-[0_10px_0_#5C2DD5]'
            onClick={openPVP}
          >
            <p className='font-bold text-lg'>PLAYER VS PLAYER</p>
            <img src={pvp} alt='pvp' />
          </div>
          <div
            className='flex bg-white items-center justify-between mb-10 p-4 rounded-3xl w-full border-[3px] border-black drop-shadow-[0_10px_0_rgb(0,0,0)] cursor-pointer hover:drop-shadow-[0_10px_0_#5C2DD5]'
            onClick={openMenu}
          >
            <p className='font-bold text-lg cursor-pointer'>GAME RULES</p>
          </div>
        </div>
      </div>
    </>
  )
}
