import React, { useState } from 'react'
import {
  board_black_large,
  board_white_large,
  counter_red_large,
  counter_yellow_large,
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
import { useSelector } from 'react-redux'
import { RootState } from './store'
import { useDispatch } from 'react-redux'
import { login, logout } from './store'

export default function Mainmenu() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  return (
    <>
      <div>
        <div>Name: {user.name}</div>
        <div>Age: {user.age}</div>
        <div>Email: {user.email}</div>
        <div>Toggle: {`${user.toggle}`}</div>
        {/* <img src={board_black_large} alt='' /> */}
        <button
          onClick={() =>
            dispatch(
              login({
                name: 'pedro',
                age: 25,
                email: 'pedro.com',
                toggle: true,
              })
            )
          }
        >
          Name Change
        </button>
        <button
          onClick={() =>
            dispatch(logout({ name: '', age: 0, email: '', toggle: false }))
          }
        >
          Logout
        </button>
      </div>
    </>
  )
}
