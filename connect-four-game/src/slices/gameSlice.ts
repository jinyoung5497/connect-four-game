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
    playerOneScore: number
    playerTwoScore: number
    timer: number
    time: number | null
    startTimer: boolean
    stopTimer: boolean
    resetTimer: boolean
    stalemate: boolean
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
    playerOneScore: 0,
    playerTwoScore: 0,
    timer: 15,
    time: null,
    startTimer: false,
    stopTimer: false,
    resetTimer: false,
    stalemate: false,
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
      state.value.gameOver = false
      state.value.playerTurn = false
      state.value.boards = [[''], [''], [''], [''], [''], [''], ['']]
      state.value.playerOneWin = false
      state.value.playerTwoWin = false
      state.value.playerOneScore = 0
      state.value.playerTwoScore = 0
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
      state.value.playerOneScore = 0
      state.value.playerTwoScore = 0
    },
    playerTurn: (state) => {
      state.value.playerTurn = !state.value.playerTurn
    },
    playerScore: (state) => {
      if (state.value.playerOneWin) {
        state.value.playerOneScore++
      }
      if (state.value.playerTwoWin) {
        state.value.playerTwoScore++
      }
      state.value.boards = [[''], [''], [''], [''], [''], [''], ['']]
      state.value.gameOver = false
      state.value.playerOneWin = false
      state.value.playerTwoWin = false
      state.value.stalemate = false
    },
    timer: (state) => {
      state.value.timer--
    },
    startTimer: (state, action: PayloadAction<boolean>) => {
      console.log('time start')
      state.value.startTimer = action.payload
    },
    stopTimer: (state, action: PayloadAction<boolean>) => {
      console.log('pause timer')
      state.value.stopTimer = action.payload
    },
    resetTimer: (state, action: PayloadAction<boolean>) => {
      console.log('time reset')
      state.value.resetTimer = action.payload
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
        state.value.boards[cols][rows] = 'v'
        state.value.boards[cols][rows - 1] = 'v'
        state.value.boards[cols][rows - 2] = 'v'
        state.value.boards[cols][rows - 3] = 'v'
        state.value.gameOver = true
        state.value.playerOneWin = true
        state.value.stopTimer = true
      }
      if (
        state.value.boards[cols][rows] === 'x' &&
        state.value.boards[cols][rows - 1] === 'x' &&
        state.value.boards[cols][rows - 2] === 'x' &&
        state.value.boards[cols][rows - 3] === 'x'
      ) {
        state.value.boards[cols][rows] = 'v'
        state.value.boards[cols][rows - 1] = 'v'
        state.value.boards[cols][rows - 2] = 'v'
        state.value.boards[cols][rows - 3] = 'v'
        state.value.gameOver = true
        state.value.playerTwoWin = true
        state.value.stopTimer = true
      }
      // HORIZONTAL WIN CONDITION
      for (let i = 0; i <= 3; i++) {
        if (
          state.value.boards[i][rows] === 'o' &&
          state.value.boards[i + 1][rows] === 'o' &&
          state.value.boards[i + 2][rows] === 'o' &&
          state.value.boards[i + 3][rows] === 'o'
        ) {
          state.value.boards[i][rows] = 'v'
          state.value.boards[i + 1][rows] = 'v'
          state.value.boards[i + 2][rows] = 'v'
          state.value.boards[i + 3][rows] = 'v'
          state.value.gameOver = true
          state.value.playerOneWin = true
          state.value.stopTimer = true
        }
        if (
          state.value.boards[i][rows] === 'x' &&
          state.value.boards[i + 1][rows] === 'x' &&
          state.value.boards[i + 2][rows] === 'x' &&
          state.value.boards[i + 3][rows] === 'x'
        ) {
          state.value.boards[i][rows] = 'v'
          state.value.boards[i + 1][rows] = 'v'
          state.value.boards[i + 2][rows] = 'v'
          state.value.boards[i + 3][rows] = 'v'
          state.value.gameOver = true
          state.value.playerTwoWin = true
          state.value.stopTimer = true
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
                state.value.boards[i][j] = 'v'
                state.value.boards[i + 1][j + 1] = 'v'
                state.value.boards[i + 2][j + 2] = 'v'
                state.value.boards[i + 3][j + 3] = 'v'
                state.value.gameOver = true
                state.value.playerOneWin = true
                state.value.stopTimer = true
              }
              if (
                state.value.boards[i][j] === 'x' &&
                state.value.boards[i + 1][j + 1] === 'x' &&
                state.value.boards[i + 2][j + 2] === 'x' &&
                state.value.boards[i + 3][j + 3] === 'x'
              ) {
                state.value.boards[i][j] = 'v'
                state.value.boards[i + 1][j + 1] = 'v'
                state.value.boards[i + 2][j + 2] = 'v'
                state.value.boards[i + 3][j + 3] = 'v'
                state.value.gameOver = true
                state.value.playerTwoWin = true
                state.value.stopTimer = true
              }
            }
            for (let j = 4; j <= 6; j++) {
              if (
                state.value.boards[i][j] === 'o' &&
                state.value.boards[i + 1][j - 1] === 'o' &&
                state.value.boards[i + 2][j - 2] === 'o' &&
                state.value.boards[i + 3][j - 3] === 'o'
              ) {
                state.value.boards[i][j] = 'v'
                state.value.boards[i + 1][j - 1] = 'v'
                state.value.boards[i + 2][j - 2] = 'v'
                state.value.boards[i + 3][j - 3] = 'v'
                state.value.gameOver = true
                state.value.playerOneWin = true
                state.value.stopTimer = true
              }
              if (
                state.value.boards[i][j] === 'x' &&
                state.value.boards[i + 1][j - 1] === 'x' &&
                state.value.boards[i + 2][j - 2] === 'x' &&
                state.value.boards[i + 3][j - 3] === 'x'
              ) {
                state.value.boards[i][j] = 'v'
                state.value.boards[i + 1][j - 1] = 'v'
                state.value.boards[i + 2][j - 2] = 'v'
                state.value.boards[i + 3][j - 3] = 'v'
                state.value.gameOver = true
                state.value.playerTwoWin = true
                state.value.stopTimer = true
              }
            }
          }
        }
      }
      // STALEMATE CONDITION
      if (
        state.value.boards[0].length == 7 &&
        state.value.boards[1].length == 7 &&
        state.value.boards[2].length == 7 &&
        state.value.boards[3].length == 7 &&
        state.value.boards[4].length == 7 &&
        state.value.boards[5].length == 7 &&
        state.value.boards[6].length == 7
      ) {
        state.value.gameOver = true
        state.value.stalemate = true
        state.value.playerOneWin = false
        state.value.playerTwoWin = false
        state.value.stopTimer = true
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
  playerScore,
  startTimer,
  stopTimer,
  resetTimer,
  timer,
} = gameSlice.actions
export default gameSlice.reducer
