import React, { useState, useEffect, useRef } from 'react'
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
  startTimer,
  resetTimer,
  stopTimer,
  clearBoard,
  playerScore,
} from '../slices/gameSlice'

export default function GameBoard() {
  const dispatch = useDispatch()
  const games = useSelector((state: RootState) => state.games.value)
  const [fallAnimation, setFallAnimation] = useState(false)
  const [animation, setAnimation] = useState(false)
  const [marker, setMarker] = useState(0)
  const [time, setTime] = useState(15)
  const [turn, setTurn] = useState(false)
  const [space, setSpace] = useState(false)

  const openMenu = () => {
    dispatch(menuToggle())
    dispatch(stopTimer(true))
  }

  const handleColumn = (index: number) => {
    setTime(15)
    dispatch(addCounter(index))
    if (games.boards[index].length !== 7) {
      dispatch(playerTurn())
    }
    dispatch(winCondition({ cols: index, rows: games.boards[index].length }))
    setFallAnimation(false)
    setAnimation((prev) => !prev)
    setMarker(index)
    console.log('Click index: ', index)
    if (games.gameOver) {
      dispatch(clearBoard())
    }
  }

  // const handleKeyDown = (event: KeyboardEvent) => {
  //   if (event.key === 'ArrowLeft') {
  //     if (marker > 0 && !games.gameOver) {
  //       setMarker((prev) => prev - 1)
  //       setTurn((prev) => !prev)
  //     } else {
  //       setTurn((prev) => !prev)
  //     }
  //   } else if (event.key === 'ArrowRight') {
  //     if (marker < 6 && !games.gameOver) {
  //       setMarker((prev) => prev + 1)
  //       setTurn((prev) => !prev)
  //     } else {
  //       setTurn((prev) => !prev)
  //     }
  //   } else if (
  //     event.key === 'Enter' ||
  //     event.key === ' ' ||
  //     event.key === 'ArrowDown'
  //   ) {
  //     if (!games.gameOver) {
  //       setSpace((prev) => !prev)
  //       handleColumn(marker)
  //       console.log('marker keypress:', marker)
  //     } else {
  //       dispatch(playerScore())
  //       dispatch(resetTimer(true))
  //       dispatch(startTimer(true))
  //       dispatch(stopTimer(false))
  //       if (games.stalemate) {
  //         dispatch(playerTurn())
  //       }
  //     }
  //   }
  //   console.log('current marker position:', marker)
  //   document.removeEventListener('keydown', handleKeyDown)
  // }

  // useEffect(() => {
  //   document.addEventListener('keydown', handleKeyDown)
  //   console.log('searching for prey-------------')
  //   // console.log('event Marker:', marker)
  //   // console.log('turn:', turn)
  //   // console.log('space:', space)
  //   // console.log('gameover:', games.gameOver)
  // }, [turn, space, games.gameOver])

  //* keyboard movement (marker)
  //* - marker click and space and teleports (handleColumn(marker) marker default is 0)
  //* - play again with spacebar after gameover
  //* - click gameover move spacebar
  //* cpu algorithm
  //* responsive design

  useEffect(() => {
    setFallAnimation((prev) => !prev)
  }, [animation])

  useEffect(() => {
    // console.log(games.boards)
  }, [games.boards])

  const handleRestart = () => {
    dispatch(restart())
    setTime(15)
    dispatch(startTimer(true))
    dispatch(stopTimer(false))
  }

  useEffect(() => {
    let intervalId: number = 15
    if (games.resetTimer) {
      setTime(15)
      dispatch(resetTimer(false))
    }
    if (games.startTimer) {
      intervalId = setInterval(() => {
        setTime((prev) => prev - 1)
      }, 1000)
    }
    if (games.stopTimer) {
      clearInterval(intervalId)
    }
    if (time === 0) {
      clearInterval(intervalId)
      setTime(15)
      dispatch(playerTurn())
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [games.startTimer, time, games.stopTimer])

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
            <p className='text-xl font-bold'>{games.playerOneScore}</p>
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
                  <div
                    key={i}
                    className='mr-[18px] h-full flex flex-col-reverse'
                  >
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
                            <div>
                              <img
                                src={counter_red_large}
                                alt='counter_red_large'
                              />
                            </div>
                          )}
                          {games.boards[i][index] == 'v' && (
                            <div>
                              {games.playerOneWin && (
                                <div>
                                  <img
                                    src={counter_red_large}
                                    alt='counter_red_large'
                                  />
                                  <div className='absolute top-[17px] left-[17px] bg-white w-9 h-9 rounded-full'></div>
                                  <div className='absolute top-[23px] left-[23px] bg-pink w-6 h-6 rounded-full'></div>
                                </div>
                              )}
                              {games.playerTwoWin && (
                                <div>
                                  <img
                                    src={counter_yellow_large}
                                    alt='counter_yellow_large'
                                  />
                                  <div className='absolute top-[17px] left-[17px] bg-white w-9 h-9 rounded-full'></div>
                                  <div className='absolute top-[23px] left-[23px] bg-yellow w-6 h-6 rounded-full'></div>
                                </div>
                              )}
                            </div>
                          )}
                          {games.boards[i][index] == 'x' && (
                            <div>
                              <img
                                src={counter_yellow_large}
                                alt='counter_yellow_large'
                              />
                            </div>
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
                    key={index}
                    className={` w-full cursor-pointer flex justify-center ${
                      games.boards[index].length == 7 && 'pointer-events-none'
                    } `}
                    onClick={() => handleColumn(index)}
                    id='columns'
                  >
                    {index == marker && (
                      <img
                        src={games.playerTurn ? marker_yellow : marker_red}
                        alt='marker_red'
                        className={`absolute top-[145px] `}
                      />
                    )}
                  </div>
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
            <p className='text-xl font-bold'>{games.playerTwoScore}</p>
          </div>
        </div>
        {/* TIMER */}
        <div className='z-10 flex flex-col items-center justify-center'>
          <img
            src={games.playerTurn ? bg_yellow : bg_red}
            alt='bg_red'
            className='absolute bottom-10'
          />
          <p className='text-white relative bottom-3'>
            {games.playerTurn ? "PLAYER 2'S" : "PLAYER 1'S"} TURN
          </p>
          <p className='text-white relative text-xl bottom-3'>{time}s</p>
          {games.gameOver && <div>hi</div>}
        </div>
        {/* background */}
        <div
          className={`absolute bottom-0  ${games.playerOneWin && 'bg-pink'}  ${
            games.playerTwoWin && 'bg-yellow'
          } ${
            !games.playerOneWin && !games.playerTwoWin && 'bg-purple'
          } w-full h-[200px] rounded-t-[60px]`}
        ></div>
      </div>
    </>
  )
}
