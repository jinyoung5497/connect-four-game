import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  value: {
    pvpToggle: boolean
    mainMenuToggle: boolean
    menuToggle: boolean
  }
}

const initialState: GameState = {
  value: {
    pvpToggle: false,
    mainMenuToggle: false,
    menuToggle: false,
  },
}

export const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    pvpToggle: (state) => {
      state.value.pvpToggle = !state.value.pvpToggle
    },
    toggleMainMenu: (state) => {
      state.value.mainMenuToggle = !state.value.mainMenuToggle
    },
    menuToggle: (state) => {
      state.value.menuToggle = !state.value.menuToggle
    },
    quitGame: (state) => {
      state.value.pvpToggle = false
      state.value.mainMenuToggle = false
      state.value.menuToggle = false
    },
  },
})

export const { toggleMainMenu, pvpToggle, menuToggle, quitGame } =
  gameSlice.actions
export default gameSlice.reducer
