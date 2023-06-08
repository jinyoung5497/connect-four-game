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
import {
  menuToggle,
  addCounter,
  restart,
  playerTurn,
  winCondition,
} from '../slices/gameSlice'

export default function GameBoard() {
  const dispatch = useDispatch()
  const games = useSelector((state: RootState) => state.games.value)
  const [fallAnimation, setFallAnimation] = useState(true)

  const openMenu = () => {
    dispatch(menuToggle())
  }

  const handleColumn = (index: number) => {
    dispatch(addCounter(index))
    dispatch(playerTurn())
    dispatch(winCondition())
    console.log(games.boards)
  }

  const handleRestart = () => {
    dispatch(restart())
  }

  return (
    <>
      <div
        className={`absolute top-0 w-full flex flex-col items-center h-full bg-purple-light ${
          games.pvpToggle ? 'block' : 'hidden'
        }`}
      >
        <div className='flex items-center justify-between w-[600px] my-16'>
          <button
            className='bg-purple p-5 rounded-full h-6 font-bold text-white flex items-center justify-center hover:bg-pink'
            onClick={openMenu}
          >
            MENU
          </button>
          <img src={logo} alt='logo' />
          <button
            className='bg-purple p-5 rounded-full h-6 font-bold text-white flex items-center justify-center hover:bg-pink'
            onClick={handleRestart}
          >
            RESTART
          </button>
        </div>
        {/* board */}
        <div className='flex items-center'>
          {/* PLAYER 1 */}
          <div className='flex flex-col bg-white items-center justify-between mb-10 p-4 rounded-3xl w-[150px] border-[3px] border-black drop-shadow-[0_10px_0_rgb(0,0,0)]'>
            <img
              src={player_one}
              alt='player_one'
              className='absolute bottom-36'
            />
            <p className='mt-7 text-lg font-bold'>PLAYER 1</p>
            <p className='text-xl font-bold'>12</p>
          </div>
          {/* GAMEBOARD */}
          <div className='grid grid-cols-1 grid-row-1  w-fit mx-14 z-10'>
            <img
              src={board_white_large}
              alt='board_white_large'
              className='col-start-1 row-start-1 z-20'
            />
            {/* counter board */}
            <div className='flex h-[630px] items-start justify-center absolute mt-1 ml-4 z-10'>
              {games.boards.map((row, i) => {
                return (
                  <div className='mr-[18px] h-full flex flex-col-reverse'>
                    <div className='w-[70px] h-[74px]'>s</div>
                    {row.map((_, index) => {
                      return (
                        <div
                          key={index}
                          className={`mb-[13px] transform transition duration-500 ease-in-out -translate-y-[540px] ${
                            fallAnimation && 'translate-y-0'
                          }`}
                        >
                          {games.boards[i][index] == 'o' && (
                            <img
                              src={counter_red_large}
                              alt='counter_red_large'
                            />
                          )}
                          {games.boards[i][index] == 'x' && (
                            <img
                              src={counter_yellow_large}
                              alt='counter_yellow_large'
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            {/* handle column */}
            <div className='row-start-1 col-start-1 h-full flex z-40'>
              {games.boards.map((_, index) => {
                return (
                  <div
                    className=' w-full'
                    onClick={() => handleColumn(index)}
                  ></div>
                )
              })}
            </div>
            <img
              src={board_black_large}
              alt='board_black_large'
              className='col-start-1 row-start-1 z-0'
            />
          </div>
          {/* PLAYER 2 */}
          <div className='flex flex-col bg-white items-center justify-between mb-10 p-4 rounded-3xl w-[150px] border-[3px] border-black drop-shadow-[0_10px_0_rgb(0,0,0)]'>
            <img
              src={player_two}
              alt='player_two'
              className='absolute bottom-36'
            />
            <p className='mt-7 text-lg font-bold'>PLAYER 2</p>
            <p className='text-xl font-bold'>22</p>
          </div>
        </div>
        {/* TIMER */}
        <div className='z-10 flex flex-col items-center justify-center'>
          <img src={bg_red} alt='bg_red' className='absolute bottom-10' />
          <p className='text-white relative bottom-3'>YOUR TURN</p>
          <p className='text-white relative text-xl bottom-3'>15s</p>
          {games.gameOver && <div>hi</div>}
        </div>
        {/* background */}
        <div className='absolute bottom-0 bg-purple w-full h-[200px] rounded-t-[60px]'></div>
      </div>
    </>
  )
}
