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
    getRows: number
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
    getRows: 0,
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
    playerTurn: (state) => {
      state.value.playerTurn = !state.value.playerTurn
    },
    getRows: (state, action: PayloadAction<number>) => {
      state.value.getRows = action.payload
    },
    winCondition: (state, action: PayloadAction<number>) => {
      if (action.payload < 4) {
        for (let j = 1; j < 4; j++) {
          if (
            state.value.boards[action.payload][j] === 'o' &&
            state.value.boards[action.payload][j + 1] === 'o' &&
            state.value.boards[action.payload][j + 2] === 'o' &&
            state.value.boards[action.payload][j + 3] === 'o'
          ) {
            state.value.gameOver = true
            state.value.playerOneWin = true
            console.log('option 1')
          }
          if (
            state.value.boards[action.payload][j] === 'x' &&
            state.value.boards[action.payload][j + 1] === 'x' &&
            state.value.boards[action.payload][j + 2] === 'x' &&
            state.value.boards[action.payload][j + 3] === 'x'
          ) {
            state.value.gameOver = true
            state.value.playerTwoWin = true
            console.log('option 2')
          }
          if (
            state.value.boards[action.payload][j] === 'o' &&
            state.value.boards[action.payload + 1][j] === 'o' &&
            state.value.boards[action.payload + 2][j] === 'o' &&
            state.value.boards[action.payload + 3][j] === 'o'
          ) {
            state.value.gameOver = true
            state.value.playerOneWin = true
            console.log('option 3')
          }
          if (
            state.value.boards[action.payload][j] === 'x' &&
            state.value.boards[action.payload + 1][j] === 'x' &&
            state.value.boards[action.payload + 2][j] === 'x' &&
            state.value.boards[action.payload + 3][j] === 'x'
          ) {
            state.value.gameOver = true
            state.value.playerTwoWin = true
            console.log('option 4')
          }
          if (
            state.value.boards[action.payload][j] === 'o' &&
            state.value.boards[action.payload + 1][j + 1] === 'o' &&
            state.value.boards[action.payload + 2][j + 2] === 'o' &&
            state.value.boards[action.payload + 3][j + 3] === 'o'
          ) {
            state.value.gameOver = true
            state.value.playerTwoWin = true
            console.log('option 5')
          }
          if (
            state.value.boards[action.payload][j] === 'x' &&
            state.value.boards[action.payload + 1][j + 1] === 'x' &&
            state.value.boards[action.payload + 2][j + 2] === 'x' &&
            state.value.boards[action.payload + 3][j + 3] === 'x'
          ) {
            state.value.gameOver = true
            state.value.playerTwoWin = true
            console.log('option 6')
          }
          // if (
          //   state.value.boards[i][j] === 'o' &&
          //   state.value.boards[i + 1][j - 1] === 'o' &&
          //   state.value.boards[i + 2][j - 2] === 'o' &&
          //   state.value.boards[i + 3][j - 3] === 'o'
          // ) {
          //   state.value.gameOver = true
          //   state.value.playerTwoWin = true
          //   console.log('option 7')
          // }
          // if (
          //   state.value.boards[i][j] === 'x' &&
          //   state.value.boards[i + 1][j - 1] === 'x' &&
          //   state.value.boards[i + 2][j - 2] === 'x' &&
          //   state.value.boards[i + 3][j - 3] === 'x'
          // ) {
          //   state.value.gameOver = true
          //   state.value.playerTwoWin = true
          //   console.log('option 8')
          // }
        }
      }

      if (action.payload >= 4) {
        for (let j = 3; j < 7; j++) {
          if (
            state.value.boards[action.payload][j] === 'o' &&
            state.value.boards[action.payload][j + 1] === 'o' &&
            state.value.boards[action.payload][j + 2] === 'o' &&
            state.value.boards[action.payload][j + 3] === 'o'
          ) {
            state.value.gameOver = true
            state.value.playerOneWin = true
            console.log('new option 1')
          }
          if (
            state.value.boards[action.payload][j] === 'x' &&
            state.value.boards[action.payload][j + 1] === 'x' &&
            state.value.boards[action.payload][j + 2] === 'x' &&
            state.value.boards[action.payload][j + 3] === 'x'
          ) {
            state.value.gameOver = true
            state.value.playerTwoWin = true
            console.log('new option 2')
          }
          // if (
          //   state.value.boards[action.payload][j] === 'o' &&
          //   state.value.boards[action.payload + 1][j] === 'o' &&
          //   state.value.boards[action.payload + 2][j] === 'o' &&
          //   state.value.boards[action.payload + 3][j] === 'o'
          // ) {
          //   state.value.gameOver = true
          //   state.value.playerOneWin = true
          //   console.log('new option 3')
          // }
          // if (
          //   state.value.boards[action.payload][j] === 'x' &&
          //   state.value.boards[action.payload + 1][j] === 'x' &&
          //   state.value.boards[action.payload + 2][j] === 'x' &&
          //   state.value.boards[action.payload + 3][j] === 'x'
          // ) {
          //   state.value.gameOver = true
          //   state.value.playerTwoWin = true
          //   console.log('new option 4')
          // }
          if (
            state.value.boards[action.payload][j] === 'o' &&
            state.value.boards[action.payload + 1][j + 1] === 'o' &&
            state.value.boards[action.payload + 2][j + 2] === 'o' &&
            state.value.boards[action.payload + 3][j + 3] === 'o'
          ) {
            state.value.gameOver = true
            state.value.playerTwoWin = true
            console.log('new option 5')
          }
          if (
            state.value.boards[action.payload][j] === 'x' &&
            state.value.boards[action.payload + 1][j + 1] === 'x' &&
            state.value.boards[action.payload + 2][j + 2] === 'x' &&
            state.value.boards[action.payload + 3][j + 3] === 'x'
          ) {
            state.value.gameOver = true
            state.value.playerTwoWin = true
            console.log('new option 6')
          }
          if (
            state.value.boards[action.payload][j] === 'o' &&
            state.value.boards[action.payload + 1][j - 1] === 'o' &&
            state.value.boards[action.payload + 2][j - 2] === 'o' &&
            state.value.boards[action.payload + 3][j - 3] === 'o'
          ) {
            state.value.gameOver = true
            state.value.playerTwoWin = true
            console.log('new option 7')
          }
          if (
            state.value.boards[action.payload][j] === 'x' &&
            state.value.boards[action.payload + 1][j - 1] === 'x' &&
            state.value.boards[action.payload + 2][j - 2] === 'x' &&
            state.value.boards[action.payload + 3][j - 3] === 'x'
          ) {
            state.value.gameOver = true
            state.value.playerTwoWin = true
            console.log('new option 8')
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
  getRows,
} = gameSlice.actions
export default gameSlice.reducer
