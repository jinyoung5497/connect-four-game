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
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../app/store'
import { addReservation, removeReservation } from '../features/reservationSlice'
import { addCustomer } from '../features/customerSlice'

export default function Mainmenu() {
  const reservations = useSelector(
    (state: RootState) => state.reservations.value
  )
  const customers = useSelector((state: RootState) => state.customers.value)
  const dispatch = useDispatch()
  const [reservationInput, setReservationInput] = useState('')

  const handleAddReservation = () => {
    if (!reservationInput) return
    dispatch(addReservation(reservationInput))
    setReservationInput('')
  }

  return (
    <>
      <div>
        {/* <img src={board_black_large} alt='' /> */}
        <div>
          {reservations.map((value, index) => {
            return (
              <div
                onClick={() => {
                  dispatch(removeReservation(index))
                  dispatch(
                    addCustomer({
                      id: `${index}`,
                      name: value,
                      food: [value],
                    })
                  )
                }}
              >
                {value}
              </div>
            )
          })}
          <input
            type='text'
            value={reservationInput}
            onChange={(event) => setReservationInput(event?.target.value)}
          />
          <button onClick={handleAddReservation}>ADD</button>
        </div>
        <div>
          {customers.map((value) => {
            return (
              <div>
                <div>{value.id}</div>
                <div>{value.name}</div>
                {value.food.map((value) => (
                  <div>{value}</div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
