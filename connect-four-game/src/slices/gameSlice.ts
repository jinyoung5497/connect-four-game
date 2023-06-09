import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GameState {
  value: {
    pvpToggle: boolean
    mainMenuToggle: boolean
    menuToggle: boolean
    boards: string[][]
    playerTurn: boolean
    gameOver: boolean
    playerOneWin: boolean
    playerTwoWin: boolean
  }
}

const initialState: GameState = {
  value: {
    pvpToggle: false,
    mainMenuToggle: false,
    menuToggle: false,
    boards: [[''], [''], [''], [''], [''], [''], ['']],
    playerTurn: false,
    gameOver: false,
    playerOneWin: false,
    playerTwoWin: false,
  },
}

interface WinConditionPayload {
  cols: number
  rows: number
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
    addCounter: (state, action: PayloadAction<number>) => {
      if (state.value.boards[action.payload].length <= 6) {
        if (state.value.playerTurn) {
          state.value.boards[action.payload].push('x')
        } else {
          state.value.boards[action.payload].push('o')
        }
      }
    },
    restart: (state) => {
      state.value.boards = [[''], [''], [''], [''], [''], [''], ['']]
      state.value.playerTurn = false
      state.value.gameOver = false
      state.value.playerOneWin = false
      state.value.playerTwoWin = false
    },
    playerTurn: (state, action: PayloadAction<number>) => {
      if (state.value.boards[action.payload].length == 7) {
        state.value.playerTurn = state.value.playerTurn
      } else {
        state.value.playerTurn = !state.value.playerTurn
      }
    },
    winCondition: (state, action: PayloadAction<WinConditionPayload>) => {
      const { cols, rows } = action.payload
      console.log('i:', cols)
      console.log('j:', rows)
      // VERTICAL WIN CONDITION
      if (
        state.value.boards[cols][rows] === 'o' &&
        state.value.boards[cols][rows - 1] === 'o' &&
        state.value.boards[cols][rows - 2] === 'o' &&
        state.value.boards[cols][rows - 3] === 'o'
      ) {
        state.value.gameOver = true
        state.value.playerOneWin = true
        console.log('option 1')
      }
      if (
        state.value.boards[cols][rows] === 'x' &&
        state.value.boards[cols][rows - 1] === 'x' &&
        state.value.boards[cols][rows - 2] === 'x' &&
        state.value.boards[cols][rows - 3] === 'x'
      ) {
        state.value.gameOver = true
        state.value.playerTwoWin = true
        console.log('option 2')
      }
      // HORIZONTAL WIN CONDITION
      for (let i = 0; i <= 3; i++) {
        if (
          state.value.boards[i][rows] === 'o' &&
          state.value.boards[i + 1][rows] === 'o' &&
          state.value.boards[i + 2][rows] === 'o' &&
          state.value.boards[i + 3][rows] === 'o'
        ) {
          state.value.gameOver = true
          state.value.playerOneWin = true
        }
        if (
          state.value.boards[i][rows] === 'x' &&
          state.value.boards[i + 1][rows] === 'x' &&
          state.value.boards[i + 2][rows] === 'x' &&
          state.value.boards[i + 3][rows] === 'x'
        ) {
          state.value.gameOver = true
          state.value.playerTwoWin = true
        }
      }
      // DIAGONAL POSITIVE WIN CONDITION
      for (let x = 0; x < 7; x++) {
        if (state.value.boards[x].length >= 5) {
          for (let i = 0; i <= 3; i++) {
            for (let j = 1; j <= 3; j++) {
              if (
                state.value.boards[i][j] === 'o' &&
                state.value.boards[i + 1][j + 1] === 'o' &&
                state.value.boards[i + 2][j + 2] === 'o' &&
                state.value.boards[i + 3][j + 3] === 'o'
              ) {
                state.value.gameOver = true
                state.value.playerOneWin = true
              }
              if (
                state.value.boards[i][j] === 'x' &&
                state.value.boards[i + 1][j + 1] === 'x' &&
                state.value.boards[i + 2][j + 2] === 'x' &&
                state.value.boards[i + 3][j + 3] === 'x'
              ) {
                state.value.gameOver = true
                state.value.playerTwoWin = true
              }
            }
            for (let j = 4; j <= 6; j++) {
              if (
                state.value.boards[i][j] === 'o' &&
                state.value.boards[i + 1][j - 1] === 'o' &&
                state.value.boards[i + 2][j - 2] === 'o' &&
                state.value.boards[i + 3][j - 3] === 'o'
              ) {
                state.value.gameOver = true
                state.value.playerOneWin = true
              }
              if (
                state.value.boards[i][j] === 'x' &&
                state.value.boards[i + 1][j - 1] === 'x' &&
                state.value.boards[i + 2][j - 2] === 'x' &&
                state.value.boards[i + 3][j - 3] === 'x'
              ) {
                state.value.gameOver = true
                state.value.playerTwoWin = true
              }
            }
          }
        }
      }
    },
  },
})

export const {
  toggleMainMenu,
  pvpToggle,
  menuToggle,
  quitGame,
  addCounter,
  restart,
  playerTurn,
  winCondition,
} = gameSlice.actions
export default gameSlice.reducer
